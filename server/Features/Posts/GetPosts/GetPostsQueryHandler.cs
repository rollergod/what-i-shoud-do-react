using ErrorOr;
using Microsoft.EntityFrameworkCore;
using server.Abstractions;
using server.Domain.Models;
using server.Persistance;
using server.Domain.Errors;
using server.Domain.Contracts.Responses.PostResponses;
using server.Extensions;

namespace server.Features.Posts.GetPosts
{
    public class GetPostsQueryHandler : ICommandHandler<GetPostsQuery, ErrorOr<GetPostsResponse>>
    {
        private readonly AppDbContext _context;

        public GetPostsQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ErrorOr<GetPostsResponse>> Handle(GetPostsQuery request, CancellationToken cancellationToken)
        {
            var posts = await _context.Posts
                                       .Include(p => p.UserModel)
                                       .Search(request.searchQuery)
                                       .OrderBy(p => p.Id)
                                       .ToListAsync();

            if (posts.Count == 0)
                return Errors.Post.PostCollectionNull;

            return new GetPostsResponse
            {
                Data = posts,
                StatusCode = 200,
                Message = "Success"
            };
        }
    }
}