namespace server.Domain.Contracts.Requests
{
    public record ChangeProfileRequest(string Name, string Email, string ImageName);
}