using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Responses.PostResponses;

namespace server.Features.Posts.GetLastFivePosts
{
    public record GetLastFivePostsQuery : ICommand<ErrorOr<GetPostsResponse>>;
}