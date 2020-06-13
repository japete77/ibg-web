using Config.Interfaces;
using Microsoft.Extensions.Configuration;
using System;

namespace Config.Implementations
{
    public class Settings : ISettings
    {
        private IConfiguration _configuration { get; }
        public Settings(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private string Get(string name) => Environment.ExpandEnvironmentVariables(_configuration[name]);

        public string S3Url { get { return Get("S3Url"); } }
        public string AWSAccessKey { get { return Get("AWS:AccessKey"); } }
        public string AWSSecretKey { get { return Get("AWS:SecretKey"); } }
        public string AWSBucket { get { return Get("AWS:Bucket"); } }
        public string YouTubeKey { get { return Get("YouTube:Key"); } }
        public string YouTubeChannelId { get { return Get("YouTube:ChannelId"); } }
        public string SermonsPlayListId { get { return Get("YouTube:SermonsPlayListId"); } }
  }
}
