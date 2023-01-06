using server.Domain.Contracts.Requests;
using server.Domain.Contracts.Responses;

namespace server.Services.Interfaces
{
    public interface IAuthService
    {
        Task RegisterAsync(RegisterRequest model);
        Task<AuthResponse> LoginAsync(LoginRequest model);
    }
}