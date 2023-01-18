using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Requests;
using server.Domain.Contracts.Responses;

namespace server.Features.Accounts.Register
{
    public record RegisterCommand(RegisterRequest model) : ICommand<ErrorOr<RegisterResponse>>;
}