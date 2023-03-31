using server.Domain.Models;

namespace server.Domain.Contracts.Responses
{
    public sealed record GetMeResponse(UserModel user);
}