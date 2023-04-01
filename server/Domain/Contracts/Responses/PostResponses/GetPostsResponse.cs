using server.Domain.Contracts.Responses.Abstract;
using server.Domain.Models;

namespace server.Domain.Contracts.Responses.PostResponses
{
    //     public sealed record GetPostsResponse(
    //         IEnumerable<Post> Posts
    //     );
    // 
    public sealed class GetPostsResponse : GetAbstractResponse<IEnumerable<Post>>
    {
    }
}