using Microsoft.AspNetCore.Identity;
using server.Domain.Contracts.Requests;
using server.Domain.Contracts.Responses;
using server.Domain.Models;
using server.Persistance;
using server.Services.Interfaces;

namespace server.Services.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _dbContext;
        private readonly IJwtProvider _jwtProvider;
        private readonly UserManager<UserModel> _userManager;
        public AuthService(
            AppDbContext dbContext,
            UserManager<UserModel> userManager,
            IJwtProvider jwtProvider)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _jwtProvider = jwtProvider;
        }

        public async Task RegisterAsync(RegisterRequest model)
        {
            var existing_user = await _userManager.FindByEmailAsync(model.Email);

            // проверка на null
        }

        public async Task<LoginResponse> LoginAsync(LoginRequest model)
        {
            var existing_user = await _userManager.FindByEmailAsync(model.Email);

            // проверка на null

            // проверка пароля

            string token = _jwtProvider.GenerateJwt(existing_user);

            LoginResponse response = new("", "", "", "", "");

            return response;
        }
    }
}