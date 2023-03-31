using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Responses;

namespace server.Features.Private.GetMe
{
    public record GetMeQuery(string userId) : ICommand<ErrorOr<GetMeResponse>>;
}