using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using server.Domain.Contracts.Requests;
using server.Domain.Contracts.Responses;
using server.Features.Accounts.Login;
using server.Features.Accounts.Register;

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
               firstError => Problem(statusCode: StatusCodes.Status409Conflict, title: firstError.Description)
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

            return result.MatchFirst(
                loginResult => Ok(loginResult),
                firstError => Problem(statusCode: StatusCodes.Status409Conflict, title: firstError.Description)
            );
        }
    }
}