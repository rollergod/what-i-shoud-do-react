using Microsoft.AspNetCore.Identity;
using server.Abstractions;
using server.Domain.Contracts.Requests;
using server.Domain.Contracts.Responses;
using server.Domain.Models;
using server.Services.Interfaces;

namespace server.Features.Accounts.Login
{
    public class LoginCommandHandler : ICommandHandler<LoginCommand, LoginResponse>
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

        public async Task<LoginResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var existingUser = await _userManager.FindByEmailAsync(request.model.Email);

            if (existingUser is null)
                return new LoginResponse(message: "User with current credentials was not found");

            bool isPasswordCorrect = await _userManager.CheckPasswordAsync(existingUser, request.model.Password);

            if (!isPasswordCorrect)
                return new LoginResponse(message: "Email or password is not correct");

            string token = _jwtProvider.GenerateJwt(existingUser);

            return new LoginResponse("Authorization is successfull", token);
        }
    }
}