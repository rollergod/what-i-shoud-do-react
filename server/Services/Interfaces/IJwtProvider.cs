using server.Domain.Models;

namespace server.Services.Interfaces
{
    public interface IJwtProvider
    {
        string GenerateJwt(UserModel model);
        RefreshToken GenerateRefreshToken();
        Dictionary<string, string> DecodeJwtToken(string token);
    }
}