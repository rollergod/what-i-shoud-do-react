using ErrorOr;

namespace server.Domain.Errors
{
    public static partial class Errors
    {
        public static class User
        {
            public static Error NotFound = Error.NotFound("404", "User not found.");
            public static Error DuplicateEmail = Error.Conflict("409", "User with given email already exists.");
            public static Error BadCredentials = Error.Validation("404", "User with current credentials does not exist");
        }
    }
}