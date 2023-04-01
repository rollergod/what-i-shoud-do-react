using ErrorOr;

namespace server.Domain.Errors
{
    public static partial class Errors
    {
        public static class Post
        {
            public static Error PostCollectionNull = Error.Failure("404", "Post collection is null");
            public static Error PostNotFound = Error.NotFound("404", "Post not found");
            public static Error PostModelNull = Error.NotFound("404", "Post model for creating is null");
        }
    }
}