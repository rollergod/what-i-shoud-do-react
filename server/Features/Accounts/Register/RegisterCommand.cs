using server.Abstractions;
using server.Domain.Contracts.Requests;

namespace server.Features.Accounts.Register
{
    public record RegisterCommand(RegisterRequest model) : ICommand<bool>;
}