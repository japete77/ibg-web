using Autofac;
using Autofac.Configuration;
using AutoMapper;
using Config.Implementations;
using FluentValidation;
using GlobalArticleDatabaseAPI.Configuration.AutoMapperProfiles;
using GlobalArticleDatabaseAPI.Filters;
using GlobalArticleDatabaseAPI.Middleware;
using GlobalArticleDatabaseAPI.Modules;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;

namespace GlobalArticleDatabaseAPI
{
  public class Startup
  {
    ILogger<Startup> _logger { get; }

    public Startup(IConfiguration configuration, IWebHostEnvironment env, ILogger<Startup> logger)
    {
      Startup.Configuration = configuration;

      var assembly = Assembly.GetExecutingAssembly();
      Startup.AppVersion = FileVersionInfo.GetVersionInfo(assembly.Location).FileVersion;

      _logger = logger;

      var envPath = Path.Combine(env.ContentRootPath, ".env");
      if (File.Exists(envPath))
      {
        DotNetEnv.Env.Load();
      }

      JsonConvert.DefaultSettings = () =>
          new JsonSerializerSettings()
          {
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
            NullValueHandling = NullValueHandling.Ignore,
            DefaultValueHandling = DefaultValueHandling.Include,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            TypeNameHandling = TypeNameHandling.Auto,
            DateTimeZoneHandling = DateTimeZoneHandling.Utc,
#if DEBUG
            Formatting = Formatting.Indented
#else
                    Formatting = Formatting.None
#endif
          };
    }

    public static IConfiguration Configuration { get; private set; }
    public static string AppVersion { get; set; }
    private static IApplicationBuilder Application { get; set; }
    public static T GetService<T>()
    {
      if (Startup.Application != null)
      {
        return (T)Startup.Application.ApplicationServices.GetService(typeof(T));
      }

      return default;
    }

    public static void ConfigureServices(IServiceCollection services)
    {
      services
          .AddAutoMapper(typeof(DefaultProfile))
          .AddSwagger(); // Ensure this sets up Swagger correctly

      services.AddCors(options =>
      {
        options.AddPolicy("AllowAll", builder =>
        {
          builder
              .AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
        });
      });

      services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
      services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
      services.AddScoped<IUrlHelper>(x =>
          x.GetRequiredService<IUrlHelperFactory>()
           .GetUrlHelper(x.GetRequiredService<IActionContextAccessor>().ActionContext));

      services.AddControllers(options =>
      {
        options.Filters.Add<ValidateModelFilter>();
        options.Filters.Add<CacheControlFilter>();
        options.Filters.Add<SecurityFilter>();
      })
      .AddNewtonsoftJson(options =>
      {
        options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
        options.SerializerSettings.DefaultValueHandling = DefaultValueHandling.Include;
        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        options.SerializerSettings.TypeNameHandling = TypeNameHandling.Auto;
#if DEBUG
        options.SerializerSettings.Formatting = Formatting.Indented;
#else
                options.SerializerSettings.Formatting = Formatting.None;
#endif
      });

      services.AddEndpointsApiExplorer(); // Enables API explorer for Swagger

      ValidatorOptions.LanguageManager.Enabled = false;
    }

    public static void ConfigureContainer(ContainerBuilder builder)
    {
      builder.RegisterType<NoOpServiceProviderIsService>().As<IServiceProviderIsService>().InstancePerLifetimeScope();

      builder.RegisterModule<DefaultModule>();
      builder.RegisterModule(new ConfigurationModule(Configuration));
    }

    public void ConfigureProductionContainer(ContainerBuilder builder)
    {
      ConfigureContainer(builder);
      // Add production-specific registrations here
    }

    public void Configure(IApplicationBuilder app)
    {
      var settings = new Settings(Startup.Configuration);

      Startup.Application = app;

      app.UseCustomExceptionHandler();

      app.UseCors("AllowAll");

      app.UseSwaggerWithOptions();

      app.UseRouting();

      // Uncomment if using authentication/authorization
      // app.UseAuthentication();
      // app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });

      _logger.LogInformation("Server started");
    }
  }

  public class NoOpServiceProviderIsService : IServiceProviderIsService
  {
    public bool IsService(Type serviceType) => false;
  }
}
