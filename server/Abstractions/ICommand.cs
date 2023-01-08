using MediatR;

namespace server.Abstractions
{
    public interface ICommand : IRequest
    {
    }

    public interface ICommand<TResponse> : IRequest<TResponse>
    {
    }
}