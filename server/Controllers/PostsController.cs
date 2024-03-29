using MediatR;
using Microsoft.AspNetCore.Mvc;
using server.Domain.Contracts.Requests;
using server.Features.Posts.CreatePost;
using server.Features.Posts.DeletePost;
using server.Features.Posts.GetLastFivePosts;
using server.Features.Posts.GetPost;
using server.Features.Posts.GetPosts;
using server.Features.Posts.UpdatePost;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly ISender _sender;

        public PostsController(ISender sender)
        {
            _sender = sender;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts(string? searchQuery)
        {
            var query = await _sender.Send(new GetPostsQuery(searchQuery));

            return query.MatchFirst(
                posts => Ok(posts),
                firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
            );
        }

        [HttpGet("last-five-posts")]
        public async Task<IActionResult> GetLastFivePosts()
        {
            var query = await _sender.Send(new GetLastFivePostsQuery());

            return query.MatchFirst(
                posts => Ok(posts),
                firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
            );
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var query = await _sender.Send(new GetPostQuery(id));

            return query.MatchFirst(
                posts => Ok(posts),
                firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
             );
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost(PostRequest postModel)
        {
            postModel.UserId = HttpContext.Response.Headers["UserId"].FirstOrDefault();
            var command = new PostCommand(postModel);

            var res = await _sender.Send(command);

            return res.MatchFirst(
                createPost => Ok(createPost),
                firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
             );
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> GetPost(int id, PostRequest requestModel)
        {
            var command = new UpdatePostCommand(id, requestModel);

            var updateResult = await _sender.Send(command);

            return updateResult.MatchFirst(
                updatedPost => Ok(updatedPost),
                firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
             );
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var command = new DeletePostCommand(id);

            var deleteResult = await _sender.Send(command);

            return deleteResult.MatchFirst(
                _ => Ok(_),
                firstError => Problem(statusCode: int.Parse(firstError.Code), title: firstError.Description)
             );
        }
    }
}