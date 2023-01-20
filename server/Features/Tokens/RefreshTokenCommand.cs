using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Requests;
using server.Domain.Contracts.Responses;

namespace server.Features.Tokens
{
    public record RefreshTokenCommand(RefreshTokenRequest model) : ICommand<ErrorOr<RefreshTokenResponse>>;
}