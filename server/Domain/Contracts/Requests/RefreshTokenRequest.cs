using System.ComponentModel.DataAnnotations;

namespace server.Domain.Contracts.Requests
{
    public record RefreshTokenRequest(
        string RefreshToken
    );
}