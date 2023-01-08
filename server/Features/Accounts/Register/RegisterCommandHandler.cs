using MediatR;
using Microsoft.AspNetCore.Identity;
using server.Domain.Contracts.Responses;
using server.Domain.Models;
using server.Services.Interfaces;

namespace server.Features.Accounts.Register
{
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, bool>
    {
        private readonly UserManager<UserModel> _userManager;
        private readonly IJwtProvider _jwtProvider;

        public RegisterCommandHandler(
            UserManager<UserModel> userManager,
            IJwtProvider jwtProvider)
        {
            _userManager = userManager;
            _jwtProvider = jwtProvider;
        }

        public async Task<bool> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            var isUserExist = await _userManager.FindByEmailAsync(request.model.Email);

            if (isUserExist is not null)
                return false;

            return true;
        }
    }
}