using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using server.Domain.Models;
using server.OptionsSetup;
using server.Persistance;
using server.Services.Interfaces;
using server.Services.Jwt;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer();

builder.Services.AddSingleton<IJwtProvider, JwtProvider>();

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddIdentityCore<UserModel>(o => o.SignIn.RequireConfirmedEmail = false)
    .AddUserManager<UserManager<UserModel>>()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.ConfigureOptions<JwtOptionsSetup>(); // когда инжектим JwtOptions срабатывает эта конфигурация
// builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection(JwtOptions.SectionName));  аналог

builder.Services.ConfigureOptions<JwtBearerOptionsSetup>();

builder.Services.AddMediatR(typeof(Program).Assembly);

var app = builder.Build();

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
