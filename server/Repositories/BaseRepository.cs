using Microsoft.AspNetCore.Identity;
using server.Persistance;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : IdentityUser
    {
        private readonly AppDbContext _context;

        public BaseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Update(T model)
        {
            _context.Update(model);
            return await SaveChangesAsync();
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}