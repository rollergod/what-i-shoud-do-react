using server.Domain.Contracts.Responses;
using Microsoft.AspNetCore.Identity;
using server.Abstractions;
using server.Domain.Models;
using server.Domain.Errors;
using ErrorOr;

namespace server.Features.Accounts.Register
{
    public sealed class RegisterCommandHandler : ICommandHandler<RegisterCommand, ErrorOr<RegisterResponse>>
    {
        private readonly UserManager<UserModel> _userManager;

        public RegisterCommandHandler(UserManager<UserModel> userManager)
        {
            _userManager = userManager;
        }

        public async Task<ErrorOr<RegisterResponse>> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var isUserExist = await _userManager.FindByEmailAsync(request.model.Email);

            if (isUserExist is not null)
                return Errors.User.BadCredentials;

            var userModel = new UserModel
            {
                Email = request.model.Email,
                UserName = request.model.Name,
                DisplayName = request.model.Name,
                ImageName = request.model.ImageName
            };

            var isCreated = await _userManager.CreateAsync(userModel, request.model.Password);

            if (!isCreated.Succeeded)
                return Errors.Authenticate.CreateUser;

            return new RegisterResponse("Registration completed");
        }
    }
}