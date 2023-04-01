using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Responses.PostResponses;

namespace server.Features.Posts.GetPosts
{
    public record GetPostsQuery : ICommand<ErrorOr<GetPostsResponse>>;
}