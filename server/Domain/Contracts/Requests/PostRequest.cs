namespace server.Domain.Contracts.Requests
{
    public sealed record PostRequest(string Title, string Text, string Image, string UserId);
}