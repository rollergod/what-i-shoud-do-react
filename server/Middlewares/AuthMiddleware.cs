using server.Services.Interfaces;

namespace server.Middlewares
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IJwtProvider _jwtProvider;

        public AuthMiddleware(RequestDelegate next, IJwtProvider jwtProvider = null)
        {
            _next = next;
            _jwtProvider = jwtProvider;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null && token != "null")
            {
                {
                    var claims = _jwtProvider.DecodeJwtToken(token);

                    if (claims.Count > 0)
                    {
                        context.Response.Headers.Add("UserId", claims.FirstOrDefault(c => c.Key == "UserId").Value);
                    }
                }

                await _next(context);
            }
        }
    }
}