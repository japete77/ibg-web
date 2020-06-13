using Autofac;
using Config.Implementations;
using Config.Interfaces;
using GlobalArticleDatabaseAPI.Services.Articles.Implementations;
using GlobalArticleDatabaseAPI.Services.Articles.Interfaces;
using GlobalArticleDatabaseAPI.Services.Sermons.Implementations;
using GlobalArticleDatabaseAPI.Services.Sermons.Interfaces;
using GlobalArticleDatabaseAPI.Services.Youtube.Implementations;
using GlobalArticleDatabaseAPI.Services.Youtube.Interface;

namespace GlobalArticleDatabaseAPI.Configuration.AutofacModules
{
  public class ServicesModule : Module
  {
    public static void Register(ContainerBuilder builder)
    {
      builder.RegisterType<SermonsService>().As<ISermonsService>().SingleInstance();
      builder.RegisterType<S3Client>().As<IS3Client>().InstancePerLifetimeScope();
      builder.RegisterType<YouTubeService>().As<IYouTubeService>().InstancePerLifetimeScope();
      builder.RegisterType<Settings>().As<ISettings>().InstancePerLifetimeScope();
    }
  }
}
