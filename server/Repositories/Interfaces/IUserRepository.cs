using server.Domain.Models;

namespace server.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> Update(UserModel model);
        Task<bool> SaveChangesAsync();
    }
}