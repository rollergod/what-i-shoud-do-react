using ErrorOr;
using Microsoft.EntityFrameworkCore;
using server.Abstractions;
using server.Domain.Contracts.Responses.PostResponses;
using server.Persistance;
using server.Domain.Errors;

namespace server.Features.Posts.UpdatePost
{
    public class UpdatePostCommandHandler : ICommandHandler<UpdatePostCommand, ErrorOr<GetPostResponse>>
    {
        private readonly AppDbContext _context;

        public UpdatePostCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ErrorOr<GetPostResponse>> Handle(UpdatePostCommand request, CancellationToken cancellationToken)
        {
            var postForUpdate = await _context.Posts.FirstOrDefaultAsync(x => x.Id == request.PostId);

            if (postForUpdate == null)
                return Errors.Post.PostNotFound;

            postForUpdate.Image = request.Model.Image;
            postForUpdate.Text = request.Model.Text;
            postForUpdate.Title = request.Model.Title;

            _context.Posts.Update(postForUpdate);
            await _context.SaveChangesAsync();

            return new GetPostResponse
            {
                Data = postForUpdate,
                Message = "success",
                StatusCode = 200
            };
        }
    }
}