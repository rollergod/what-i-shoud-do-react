using Microsoft.AspNetCore.Identity;

namespace server.Domain.Models
{
    public class UserModel : IdentityUser
    {
        public string DisplayName { get; set; }
        public string ImageName { get; set; }
        public List<RefreshToken> RefreshTokens { get; set; } = new();
    }
}