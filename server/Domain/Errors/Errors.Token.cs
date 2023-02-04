using ErrorOr;

namespace server.Domain.Errors
{
    public static partial class Errors
    {
        public static class Token
        {
            public static Error RefreshTokenIsntActive = Error.Failure("RefreshTokenHandler", "Refresh token isn`t active.");
        }
    }
}