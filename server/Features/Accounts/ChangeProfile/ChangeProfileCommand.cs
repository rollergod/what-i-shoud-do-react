using ErrorOr;
using MediatR;
using server.Abstractions;
using server.Domain.Contracts.Requests;

namespace server.Features.Accounts.ChangeProfile
{
    public record ChangeProfileCommand(string userId, ChangeProfileRequest request) : ICommand<ErrorOr<Unit>>;
}