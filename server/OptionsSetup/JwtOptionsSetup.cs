using Microsoft.Extensions.Options;
using server.Services.Jwt;

namespace server.OptionsSetup
{
    public sealed class JwtOptionsSetup : IConfigureOptions<JwtOptions>
    {
        private readonly IConfiguration _configuration;

        public JwtOptionsSetup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Configure(JwtOptions options)
        {
            _configuration.GetSection(JwtOptions.SectionName).Bind(options);
        }
    }
}