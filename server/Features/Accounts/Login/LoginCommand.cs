using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Requests;
using server.Domain.Contracts.Responses;

namespace server.Features.Accounts.Login
{
    public record LoginCommand(LoginRequest model) : ICommand<ErrorOr<LoginResponse>>;
}