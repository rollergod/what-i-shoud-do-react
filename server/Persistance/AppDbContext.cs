using System.Linq.Expressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using server.Domain.Models;

namespace server.Persistance
{
    public sealed class AppDbContext : IdentityDbContext<UserModel>
    {
        private readonly IConfiguration _configuration;
        public AppDbContext(
            DbContextOptions<AppDbContext> options,
            IConfiguration configuration)
                : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Post> Posts { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            var hasher = new PasswordHasher<IdentityUser>();

            builder.Entity<UserModel>()
                .Property(x => x.ImageName)
                .IsRequired(false);

            builder.Entity<UserModel>().HasData(
                new UserModel()
                {
                    Id = "8e445865-a24d-4543-a6c6-9443d048cdb9", // primary key
                    DisplayName = "myuser",
                    UserName = "myuser",
                    NormalizedUserName = "MYUSER",
                    PasswordHash = hasher.HashPassword(null, "Pa$$w0rd")
                }
            );

            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
        }
    }
}