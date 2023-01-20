using ErrorOr;
using Microsoft.AspNetCore.Identity;
using server.Abstractions;
using server.Domain.Contracts.Responses;
using server.Domain.Errors;
using server.Domain.Models;
using server.Persistance;
using server.Services.Interfaces;

namespace server.Features.Accounts.Login
{
    public sealed class LoginCommandHandler : ICommandHandler<LoginCommand, ErrorOr<LoginResponse>>
    {
        private readonly AppDbContext _context;
        private readonly UserManager<UserModel> _userManager;
        private readonly IJwtProvider _jwtProvider;

        public LoginCommandHandler(
            UserManager<UserModel> userManager,
            IJwtProvider jwtProvider,
            AppDbContext context)
        {
            _userManager = userManager;
            _jwtProvider = jwtProvider;
            _context = context;
        }

        public async Task<ErrorOr<LoginResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var existingUser = await _userManager.FindByEmailAsync(request.model.Email);

            if (existingUser is null)
                return Errors.User.NotFound;

            bool isPasswordCorrect = await _userManager.CheckPasswordAsync(existingUser, request.model.Password);

            if (!isPasswordCorrect)
                return Errors.User.BadCredentials;

            string token = _jwtProvider.GenerateJwt(existingUser);
            RefreshToken refreshToken = _jwtProvider.GenerateRefreshToken();

            existingUser.RefreshTokens.Add(refreshToken);

            removeOldRefreshTokens(existingUser);

            _context.Update(existingUser);
            await _context.SaveChangesAsync();

            return new LoginResponse(
                message: "Authorization is successfull",
                AccessToken: token,
                imageName: existingUser.ImageName,
                userName: existingUser.DisplayName,
                refreshToken: refreshToken.Token);
        }

        private void removeOldRefreshTokens(UserModel user)
        {
            user.RefreshTokens.RemoveAll(x =>
                !x.IsActive &&
                x.Created.AddDays(30) <= DateTime.UtcNow);
        }
    }
}