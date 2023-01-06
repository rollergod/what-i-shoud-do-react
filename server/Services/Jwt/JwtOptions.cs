namespace server.Services.Jwt
{
    public sealed class JwtOptions
    {
        public const string SectionName = "JwtOptions";
        public string Secret { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public int Expiry { get; set; }
    }
}