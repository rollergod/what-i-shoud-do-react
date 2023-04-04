namespace server.Domain.Contracts.Requests
{
    public sealed record PostRequest
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public string Image { get; set; }
        public string UserId { get; set; } = "";
    }
}