using ErrorOr;
using server.Abstractions;
using server.Persistance;
using server.Domain.Errors;
using Microsoft.EntityFrameworkCore;
using server.Domain.Contracts.Responses.PostResponses;

namespace server.Features.Posts.GetPost
{
    public class GetPostQueryHandler : ICommandHandler<GetPostQuery, ErrorOr<GetPostResponse>>
    {
        private readonly AppDbContext _context;

        public GetPostQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ErrorOr<GetPostResponse>> Handle(GetPostQuery request, CancellationToken cancellationToken)
        {
            if (request.Id < 0)
                return Errors.Server.BadRequest;

            var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == request.Id);

            if (post == null)
                return Errors.Post.PostNotFound;

            post.ViewCount++;
            await _context.SaveChangesAsync();

            return new GetPostResponse
            {
                Data = post,
                Message = "success",
                StatusCode = 200
            };
        }
    }
}