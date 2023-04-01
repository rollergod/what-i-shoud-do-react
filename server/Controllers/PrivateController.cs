using ErrorOr;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Domain.Contracts.Responses;
using server.Features.Private.GetMe;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrivateController : ControllerBase
    {
        private readonly ISender _sender;

        public PrivateController(ISender sender)
        {
            _sender = sender;
        }

        [HttpGet("getOkMessage")]
        [Authorize]
        public IActionResult Get()
        {
            return Ok(new { message = "You have an access to private method" });
        }


        [HttpGet("getMe")]
        [Authorize]
        public async Task<IActionResult> GetMe()
        {
            var val = HttpContext.Request.Headers["UserId"].FirstOrDefault();
            var query = new GetMeQuery("");
            ErrorOr<GetMeResponse> result = await _sender.Send(query);

            return result.MatchFirst(
               userInfo => Ok(userInfo),
               firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
           );
        }
    }
}