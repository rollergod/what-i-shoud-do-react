namespace server.Domain.Contracts.Responses
{
    public sealed record RefreshTokenResponse(
        string Token,
        string RefreshToken,
        string Email,
        string UserName
    );
}