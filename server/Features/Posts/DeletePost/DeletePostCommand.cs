using ErrorOr;
using MediatR;
using server.Abstractions;

namespace server.Features.Posts.DeletePost
{
    public record DeletePostCommand(int postId) : ICommand<ErrorOr<Unit>>;
}