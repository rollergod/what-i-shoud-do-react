using server.Domain.Models;

namespace server.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public Task<bool> Update(UserModel model);
        public Task<bool> SaveChangesAsync();
    }
}