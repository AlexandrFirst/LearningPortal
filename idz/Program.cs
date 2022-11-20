using AutoMapper;
using idz.DL;
using idz.DL.Triggers;
using idz.Profiles;
using idz.ReadModels;
using idz.Services;
using idz.Utils;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

string connectionString = builder.Configuration.GetRequiredSection("ConnectionString")["MMSDb"];
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(connectionString);
    options.UseTriggers(triggerOptions =>
    {
        triggerOptions.AddTrigger<DeleteLinkTrigger>();
    });
});

builder.Services.AddSingleton<PasswordHelper>();
builder.Services.AddSingleton<BackgroundQueue>();

builder.Services.AddTransient<IEmailService, EmailService>();

builder.Services.AddScoped<ICloudinaryService, CloudinaryService>();

builder.Services.AddOptions<EmailOption>().Bind(builder.Configuration.GetSection("MailSettings"));
builder.Services.AddOptions<PasswordOption>().Bind(builder.Configuration.GetSection("SecretUserKey"));
builder.Services.AddOptions<CloudinaryOptions>().Bind(builder.Configuration.GetSection("CloudinarySettings"));

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "Cookies";
}).AddCookie("Cookies", options =>
{
    options.Cookie.Name = "auth_cookie";
    options.Cookie.SameSite = SameSiteMode.None;
    options.Events = new CookieAuthenticationEvents
    {
        OnRedirectToLogin = redirectContext =>
        {
            redirectContext.HttpContext.Response.StatusCode = 401;
            return Task.CompletedTask;
        }
    };
    options.ExpireTimeSpan = TimeSpan.Zero;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(
    "CorsPolicy",
    builder =>
    {
        builder.
            AllowAnyOrigin().
            AllowAnyHeader().
            AllowAnyMethod();
    });
});

var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new UserProfile());
    mc.AddProfile(new TabProfile());
    mc.AddProfile(new LinkProfile());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
