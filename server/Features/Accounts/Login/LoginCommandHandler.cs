using ErrorOr;
using Microsoft.AspNetCore.Identity;
using server.Abstractions;
using server.Domain.Contracts.Responses;
using server.Domain.Errors;
using server.Domain.Models;
using server.Services.Interfaces;

namespace server.Features.Accounts.Login
{
    public class LoginCommandHandler : ICommandHandler<LoginCommand, ErrorOr<LoginResponse>>
    {
        private readonly UserManager<UserModel> _userManager;
        private readonly IJwtProvider _jwtProvider;

        public LoginCommandHandler(
            UserManager<UserModel> userManager,
            IJwtProvider jwtProvider)
        {
            _userManager = userManager;
            _jwtProvider = jwtProvider;
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

            return new LoginResponse(
                message: "Authorization is successfull",
                AccessToken: token,
                imageName: existingUser.ImageName);
        }
    }
}