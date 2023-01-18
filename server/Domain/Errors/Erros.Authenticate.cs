using ErrorOr;

namespace server.Domain.Errors
{
    public static partial class Errors
    {
        public static class Authenticate
        {
            public static Error CreateUser = Error.Failure("Login.CreateUser", "Something went wrong while creating a new user instance.");
        }
    }
}