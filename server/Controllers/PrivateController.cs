using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrivateController : ControllerBase
    {

        [HttpGet("getOkMessage")]
        [Authorize]
        public IActionResult Get()
        {
            return Ok(new { message = "You have an access to private method" });
        }
    }
}