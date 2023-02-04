using ErrorOr;

namespace server.Domain.Errors
{
    public static partial class Errors
    {
        public static class Server
        {
            public static Error BadSavingChanges = Error.Unexpected("SaveChanges", "Something went wrong while saving a new user data.");
        }
    }
}