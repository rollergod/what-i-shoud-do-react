namespace server.Domain.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string UserModelId { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string Image { get; set; }
        public int ViewCount { get; set; } = 0;
    }
}