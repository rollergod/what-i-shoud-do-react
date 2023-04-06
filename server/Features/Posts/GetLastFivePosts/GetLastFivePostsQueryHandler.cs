using ErrorOr;
using Microsoft.EntityFrameworkCore;
using server.Abstractions;
using server.Persistance;
using server.Domain.Errors;
using server.Domain.Contracts.Responses.PostResponses;

namespace server.Features.Posts.GetLastFivePosts
{
    public class GetLastFivePostsQueryHandler : ICommandHandler<GetLastFivePostsQuery, ErrorOr<GetPostsResponse>>
    {
        private readonly AppDbContext _context;
        public GetLastFivePostsQueryHandler(AppDbContext context)
        {
            _context = context;
        }
        public async Task<ErrorOr<GetPostsResponse>> Handle(GetLastFivePostsQuery request, CancellationToken cancellationToken)
        {
            var lastFivePosts = await _context.Posts
                                                .TakeLast(5)
                                                .ToListAsync();

            if (lastFivePosts == null)
                return Errors.Post.PostCollectionNull;

            return new GetPostsResponse
            {
                Data = lastFivePosts,
                Message = "success",
                StatusCode = 200
            };
        }
    }
}