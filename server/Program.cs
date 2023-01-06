using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using server.Domain.Models;
using server.OptionsSetup;
using server.Persistance;
using server.Services.Jwt;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o => o.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true
    });

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddIdentityCore<UserModel>()
    .AddUserManager<UserManager<UserModel>>()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.ConfigureOptions<JwtOptionsSetup>(); // когда инжектим JwtOptions срабатывает эта конфигурация
// builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection(JwtOptions.SectionName));  аналог

builder.Services.ConfigureOptions<JwtBearerOptionsSetup>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
