using Microsoft.AspNetCore.Identity;

namespace server.Repositories.Interfaces
{
    public interface IBaseRepository<T> where T : IdentityUser
    {
        public Task<bool> Update(T model);
        public Task<bool> SaveChangesAsync();
    }
}