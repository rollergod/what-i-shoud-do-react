using ErrorOr;

namespace server.Domain.Errors
{
    public static partial class Errors
    {
        public static class Server
        {
            public static Error BadSavingChanges = Error.Unexpected("SaveChanges", "Something went wrong while saving a new user data.");
            public static Error BadRequest = Error.Validation("Bad value for a property", "Property has a unvalid value");
        }
    }
}