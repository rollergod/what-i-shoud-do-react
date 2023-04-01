using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Responses;
using server.Domain.Contracts.Responses.PostResponses;

namespace server.Features.Posts.GetPost
{
    public record GetPostQuery(int Id) : ICommand<ErrorOr<GetPostResponse>>;
}