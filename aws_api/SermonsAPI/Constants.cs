using Config.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace GlobalArticleDatabaseAPI
{
    public static class Constants
    {
        public static class Swagger
        {
            public static string EndPoint => $"/swagger/{Version}/swagger.json";
            public const string ApiName = "Sermons API";
            public const string Version = "v1";
        }
    }
}
