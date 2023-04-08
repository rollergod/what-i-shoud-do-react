using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Requests;
using server.Domain.Contracts.Responses.PostResponses;

namespace server.Features.Posts.UpdatePost
{
    public record UpdatePostCommand(int PostId, PostRequest Model) : ICommand<ErrorOr<GetPostResponse>>;
}