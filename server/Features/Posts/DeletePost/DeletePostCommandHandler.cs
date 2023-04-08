using ErrorOr;
using MediatR;
using Microsoft.EntityFrameworkCore;
using server.Abstractions;
using server.Persistance;
using server.Domain.Errors;

namespace server.Features.Posts.DeletePost
{
    public class DeletePostCommandHandler : ICommandHandler<DeletePostCommand, ErrorOr<Unit>>
    {
        private readonly AppDbContext _context;

        public DeletePostCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ErrorOr<Unit>> Handle(DeletePostCommand request, CancellationToken cancellationToken)
        {
            var postForDelete = await _context.Posts.FirstOrDefaultAsync(p => p.Id == request.postId);

            if (postForDelete == null)
                return Errors.Post.PostNotFound;

            _context.Posts.Remove(postForDelete);
            await _context.SaveChangesAsync();

            return Unit.Value;
        }
    }
}