namespace server.Domain.Contracts.Responses.Abstract
{
    public abstract class GetAbstractResponse<T>
    {
        public T Data { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}