using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using server.Domain.Models;
using server.Persistance;
using server.Repositories.Interfaces;

namespace server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Update(UserModel model)
        {
            _context.Update(model);
            return await SaveChangesAsync();
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<UserModel> GetUserWithCurrentRefreshToken(string refreshToken)
        {
            return await _context.Users.Include(t => t.RefreshTokens)
                                                     .SingleOrDefaultAsync(x => x.RefreshTokens.Any(t => t.Token == refreshToken));
        }
    }
}