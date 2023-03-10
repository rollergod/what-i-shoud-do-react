using ErrorOr;

namespace server.Domain.Errors
{
    public static partial class Errors
    {
        public static class User
        {
            public static Error NotFound = Error.NotFound("User.NotFound", "User not found.");
            public static Error DuplicateEmail = Error.Conflict("User.DuplicateEmail", "User with given email already exists.");
            public static Error BadCredentials = Error.Validation("User.BadCredentials", "User with current credentials does not exist");
        }
    }
}