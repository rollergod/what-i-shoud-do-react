using System.Text;
using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Responses;
using server.Persistance;
using server.Domain.Errors;
using server.Domain.Models;
using server.Services.Jwt;
using server.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using server.Repositories.Interfaces;

namespace server.Features.Tokens
{
    public sealed class RefreshTokenCommandHandler : ICommandHandler<RefreshTokenCommand, ErrorOr<RefreshTokenResponse>>
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtProvider _jwtProvider;

        public RefreshTokenCommandHandler(
            AppDbContext context,
            IJwtProvider jwtProvider,
            IUserRepository userRepository)
        {
            _jwtProvider = jwtProvider;
            _userRepository = userRepository;
        }
        public async Task<ErrorOr<RefreshTokenResponse>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var currentRefreshToken = Uri.UnescapeDataString(request.model.RefreshToken);
            var userWithCurrentToken = await _userRepository.GetUserWithCurrentRefreshToken(currentRefreshToken);

            if (userWithCurrentToken is null)
                return Errors.User.NotFound;

            RefreshToken refreshToken = userWithCurrentToken.RefreshTokens.SingleOrDefault(x => x.Token == currentRefreshToken);

            if (!refreshToken.IsActive)
                return Errors.Token.RefreshTokenIsntActive;

            refreshToken.Revoked = DateTime.UtcNow;

            var newRefreshToken = _jwtProvider.GenerateRefreshToken();
            userWithCurrentToken.RefreshTokens.Add(newRefreshToken);

            var isUpdated = await _userRepository.Update(userWithCurrentToken);

            if (!isUpdated)
                return Errors.Server.BadSavingChanges;

            string accessToken = _jwtProvider.GenerateJwt(userWithCurrentToken);

            return new RefreshTokenResponse(
                Token: accessToken,
                RefreshToken: newRefreshToken.Token,
                Email: userWithCurrentToken.Email,
                UserName: userWithCurrentToken.UserName
            );
        }
    }
}