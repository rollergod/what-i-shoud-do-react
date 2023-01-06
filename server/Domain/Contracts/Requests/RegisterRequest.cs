namespace server.Domain.Contracts.Requests
{
    public record RegisterRequest(
        string Name,
        string Password,
        string Email,
        string ImageName
    );
}