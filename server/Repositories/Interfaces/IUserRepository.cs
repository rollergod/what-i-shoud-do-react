using server.Domain.Models;

namespace server.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<UserModel> GetUserWithCurrentRefreshToken(string refreshToken);
        Task<bool> Update(UserModel model);
        Task<bool> SaveChangesAsync();
    }
}