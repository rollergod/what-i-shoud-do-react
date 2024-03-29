using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Responses.PostResponses;

namespace server.Features.Posts.GetPosts
{
    public record GetPostsQuery(string? searchQuery) : ICommand<ErrorOr<GetPostsResponse>>;
}