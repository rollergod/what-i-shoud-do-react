namespace server.Domain.Contracts
{
    public record RegisterRequest(
        string name,
        string password,
        string email,
        string imageName
    );
}