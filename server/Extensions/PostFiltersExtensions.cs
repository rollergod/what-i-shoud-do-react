using server.Domain.Models;

namespace server.Extensions
{
    public static class UserRepositoryExtensions
    {
        public static IQueryable<Post> Search(this IQueryable<Post> posts, string searchQuery)
        {
            if (string.IsNullOrEmpty(searchQuery))
                return posts;

            string lowercaseSearchQuery = searchQuery.Trim().ToLower();

            return posts.Where(p => p.Title.ToLower().Contains(lowercaseSearchQuery));
        }
    }
}