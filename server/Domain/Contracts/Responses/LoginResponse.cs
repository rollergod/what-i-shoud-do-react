namespace server.Domain.Contracts.Responses
{
    public sealed record LoginResponse(string message, string AccessToken = default, string imageName = default);
}