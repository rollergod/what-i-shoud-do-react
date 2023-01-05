namespace server.Domain.Contracts
{
    public record LoginRequest(
        string name, string password
    );
}