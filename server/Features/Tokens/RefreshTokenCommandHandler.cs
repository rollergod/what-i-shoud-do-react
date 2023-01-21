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

namespace server.Features.Tokens
{
    public sealed class RefreshTokenCommandHandler : ICommandHandler<RefreshTokenCommand, ErrorOr<RefreshTokenResponse>>
    {
        private readonly AppDbContext _context;
        private readonly IJwtProvider _jwtProvider;

        public RefreshTokenCommandHandler(AppDbContext context, IJwtProvider jwtProvider)
        {
            _context = context;
            _jwtProvider = jwtProvider;
        }
        public async Task<ErrorOr<RefreshTokenResponse>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
        {
            var test = Uri.UnescapeDataString(request.model.RefreshToken); //поменять имя
            var users = _context.Users.Include(t => t.RefreshTokens).ToList();
            var userWithCurrentToken = _context.Users.SingleOrDefault(x => x.RefreshTokens.Any(t => t.Token == test));
            var usersWithInclude = _context.Users.Include(t => t.RefreshTokens).SingleOrDefault(x => x.RefreshTokens.Any(t => t.Token == test));
            //последний вариант рабочий

            if (userWithCurrentToken is null)
                return Errors.User.NotFound;

            RefreshToken refreshToken = userWithCurrentToken.RefreshTokens.SingleOrDefault(x => x.Token == request.model.RefreshToken);

            if (!refreshToken.IsActive)
                return Errors.User.NotFound; //TODO : исправить возвращаемый тип

            refreshToken.Revoked = DateTime.UtcNow;

            var newRefreshToken = _jwtProvider.GenerateRefreshToken();
            userWithCurrentToken.RefreshTokens.Add(newRefreshToken);

            _context.Update(userWithCurrentToken);
            await _context.SaveChangesAsync();

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