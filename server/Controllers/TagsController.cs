using MediatR;
using Microsoft.AspNetCore.Mvc;
using server.Features.Posts.GetPost;
using server.Features.Posts.GetPosts;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagsController : ControllerBase
    {
        private readonly ISender _sender;

        public TagsController(ISender sender)
        {
            _sender = sender;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            var query = await _sender.Send(new GetPostsQuery());

            return query.MatchFirst(
                posts => Ok(posts),
                firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
            );
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetPosts(int id)
        {
            var query = await _sender.Send(new GetPostQuery(id));

            return query.MatchFirst(
                posts => Ok(posts),
                firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
             );
        }
    }
}