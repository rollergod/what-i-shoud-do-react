using MediatR;
using Microsoft.AspNetCore.Mvc;
using server.Domain.Contracts.Requests;
using server.Domain.Errors;
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

            var result = await _sender.Send(command); //TODO: bad request?

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            LoginRequest request,
            CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var command = new LoginCommand(request);

            var result = await _sender.Send(command); //TODO: bad request?

            return result.MatchFirst(
                authResult => Ok(authResult),
                error => Ok(error) // TODO разобраться почему не работает errors => error is ... ?
            );

            // return string.IsNullOrEmpty(result.AccessToken) ? BadRequest(result) : Ok(result); // error reponse
        }
    }
}