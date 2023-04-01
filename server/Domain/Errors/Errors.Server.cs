using ErrorOr;

namespace server.Domain.Errors
{
    public static partial class Errors
    {
        public static class Server
        {
            public static Error BadSavingChanges = Error.Unexpected("500", "Something went wrong while saving a new user data.");
            public static Error BadRequest = Error.Validation("400", "Property has a unvalid value");
        }
    }
}