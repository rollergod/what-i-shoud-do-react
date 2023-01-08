using System.Security.AccessControl;
using System.Threading;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using server.Services.Interfaces;
using System.Security.Claims;
using server.Domain.Models;

namespace server.Services.Jwt
{
    public sealed class JwtProvider : IJwtProvider
    {
        private JwtOptions _jwtOptions;

        public JwtProvider(IOptions<JwtOptions> jwtOptions)
        {
            _jwtOptions = jwtOptions.Value;
        }

        public string GenerateJwt(UserModel user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(_jwtOptions.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Issuer = _jwtOptions.Issuer,

                Audience = _jwtOptions.Audience,

                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat,DateTime.UtcNow.ToString()),
                    new Claim(JwtRegisteredClaimNames.Name,user.UserName),
                    new Claim(JwtRegisteredClaimNames.Email,user.Email),
                }),

                Expires = DateTime.UtcNow.AddMinutes(_jwtOptions.Expiry),

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        //v2
        // public string GenerateJwt(UserModel user)
        // {
        //     Claim[] claims = new Claim[] {
        //         new Claim(JwtRegisteredClaimNames.Sub,user.Id),
        //         new Claim(JwtRegisteredClaimNames.Email,user.Email),
        //     };

        //     var signingCredentials = new SigningCredentials(
        //         new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Secret)),
        //         SecurityAlgorithms.HmacSha256);

        //     var token = new JwtSecurityToken(
        //         _jwtOptions.Issuer,
        //         _jwtOptions.Audience,
        //         claims,
        //         null,
        //         DateTime.UtcNow.AddHours(1),
        //         signingCredentials
        //     );

        //     string tokenValue = new JwtSecurityTokenHandler()
        //         .WriteToken(token);

        //     return tokenValue;
        // }
    }
}