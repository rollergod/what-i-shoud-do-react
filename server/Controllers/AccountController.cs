using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using server.Domain.Contracts.Requests;
using server.Domain.Contracts.Responses;
using server.Features.Accounts.ChangeProfile;
using server.Features.Accounts.Login;
using server.Features.Accounts.Register;
using server.Features.Tokens;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private ISender _sender;

        public AccountController(ISender sender)
        {
            _sender = sender;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(
            RegisterRequest request,
            CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var command = new RegisterCommand(request);

            ErrorOr<RegisterResponse> result = await _sender.Send(command);

            return result.MatchFirst(
               registerResult => Ok(registerResult),
               firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
            );
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            LoginRequest request,
            CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var command = new LoginCommand(request);

            ErrorOr<LoginResponse> result = await _sender.Send(command);

            if (result.Value != null && !string.IsNullOrEmpty(result.Value.refreshToken))
                setTokenCookie(result.Value.refreshToken);

            return result.MatchFirst(
                loginResult => Ok(loginResult),
                firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
            );
        }

        [HttpPost("refreshToken")]
        public async Task<IActionResult> RefreshToken(
            RefreshTokenRequest request,
            CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var command = new RefreshTokenCommand(request);

            ErrorOr<RefreshTokenResponse> result = await _sender.Send(command);

            if (!string.IsNullOrEmpty(result.Value.RefreshToken))
                setTokenCookie(result.Value.RefreshToken);

            return result.MatchFirst(
                refreshTokenResult => Ok(refreshTokenResult),
                firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
            );
        }

        [HttpPost("changeProfile")]
        public async Task<IActionResult> ChangeProfile(
            ChangeProfileRequest request,
            CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var command = new ChangeProfileCommand(userId: HttpContext.Response.Headers["UserId"].FirstOrDefault(), request);

            var changeResult = await _sender.Send(command);

            return changeResult.MatchFirst(
                _ => Ok(_),
                firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
            );
        }

        private void setTokenCookie(string token)
        {
            // append cookie with refresh token to the http response
            var cookieOptions = new CookieOptions
            {
                // HttpOnly = true, // тестинг
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }
    }
}