using Microsoft.AspNetCore.Mvc;
using server.Domain.Contracts.Requests;
using server.Services.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private IAuthService _authService;

        public AccountController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = _authService.RegisterAsync(request);

            return Ok("registered");
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = _authService.LoginAsync(request);

            //token
            return Ok(result);
        }
    }
}