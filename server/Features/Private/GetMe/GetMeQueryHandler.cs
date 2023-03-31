using ErrorOr;
using server.Abstractions;
using server.Domain.Contracts.Responses;
using server.Persistance;
using server.Domain.Errors;
namespace server.Features.Private.GetMe
{
    public class GetMeQueryHandler : ICommandHandler<GetMeQuery, ErrorOr<GetMeResponse>>
    {
        private readonly AppDbContext _context;

        public GetMeQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ErrorOr<GetMeResponse>> Handle(GetMeQuery request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.userId))
                return Errors.Server.BadRequest;

            var userModel = _context.Users.FirstOrDefault(u => u.Id == request.userId);

            if (userModel is null)
                return Errors.User.NotFound;

            return new GetMeResponse(user: userModel);

        }
    }
}