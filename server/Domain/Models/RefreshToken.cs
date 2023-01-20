namespace server.Domain.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public DateTime Expires { get; set; }
        public DateTime Created { get; set; } // TODO : не работает!!!!!!!!!!!!!!!
        public DateTime? Revoked { get; set; }
        public bool IsExpired => DateTimeOffset.Now >= Expires;
        public bool IsRevoked => Revoked != null;
        public bool IsActive => !IsRevoked && !IsExpired;
    }
}