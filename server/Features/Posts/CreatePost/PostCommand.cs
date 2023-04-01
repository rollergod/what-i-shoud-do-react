using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Requests;
using server.Domain.Contracts.Responses.PostResponses;

namespace server.Features.Posts.CreatePost
{
    public record PostCommand(PostRequest model) : ICommand<ErrorOr<CreatePostResponse>>;
}