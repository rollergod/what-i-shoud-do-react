using Microsoft.AspNetCore.Identity;
using server.Domain.Contracts;
using server.Domain.Models;
using server.Persistance;

namespace server.Services.Authentication
{
    public class AuthService
    {
        private readonly AppDbContext _dbContext;
        private readonly UserManager<UserModel> _userManager;

        public AuthService(AppDbContext dbContext, UserManager<UserModel> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public void Register(RegisterRequest registerModel)
        {

        }
    }
}