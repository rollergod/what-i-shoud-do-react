using MediatR;
using Microsoft.AspNetCore.Mvc;
using server.Domain.Contracts.Requests;
using server.Features.Accounts.Register;
using server.Services.Interfaces;

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

            var result = await _sender.Send(command);

            return Ok(result);
        }

        [HttpPost("login")]
        public IActionResult Login(
            LoginRequest request,
            CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            // var result = _authService.LoginAsync(request);

            //token
            return Ok("token");
        }
    }
}