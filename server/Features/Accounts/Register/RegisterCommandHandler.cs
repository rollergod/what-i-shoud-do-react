using MediatR;
using Microsoft.AspNetCore.Identity;
using server.Abstractions;
using server.Domain.Contracts.Responses;
using server.Domain.Models;
using server.Services.Interfaces;

namespace server.Features.Accounts.Register
{
    public class RegisterCommandHandler : ICommandHandler<RegisterCommand, RegisterResponse>
    {
        private readonly UserManager<UserModel> _userManager;

        public RegisterCommandHandler(UserManager<UserModel> userManager)
        {
            _userManager = userManager;
        }

        public async Task<RegisterResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var isUserExist = await _userManager.FindByEmailAsync(request.model.Email);

            if (isUserExist is not null)
                return new RegisterResponse("User with current credentials already exists");

            var userModel = new UserModel
            {
                Email = request.model.Email,
                UserName = request.model.Name,
                DisplayName = request.model.Name,
                ImageName = request.model.ImageName
            };

            var isCreated = await _userManager.CreateAsync(userModel, request.model.Password);

            if (!isCreated.Succeeded)
                return new RegisterResponse("Something went wrong while creating a new user instance");

            return new RegisterResponse("Registration completed");
        }
    }
}