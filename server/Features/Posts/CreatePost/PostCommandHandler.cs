using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Responses.PostResponses;
using server.Persistance;
using server.Domain.Errors;
using server.Domain.Models;

namespace server.Features.Posts.CreatePost
{
    public sealed class PostCommandHandler : ICommandHandler<PostCommand, ErrorOr<CreatePostResponse>>
    {
        private readonly AppDbContext _context;

        public PostCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ErrorOr<CreatePostResponse>> Handle(PostCommand request, CancellationToken cancellationToken)
        {
            if (request.model == null)
                return Errors.Post.PostModelNull;

            var post = new Post
            {
                Text = request.model.Text,
                Title = request.model.Title,
                Image = request.model.Image,
                UserModelId = request.model.UserId
            };

            var res = await _context.AddAsync(post);
            await _context.SaveChangesAsync();

            return new CreatePostResponse
            {
                Data = post,
                Message = "Success",
                StatusCode = 200
            };
        }
    }
}