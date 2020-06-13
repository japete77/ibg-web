namespace Config.Interfaces
{
  public interface ISettings
  {
    string S3Url { get; }
    string AWSAccessKey { get; }
    string AWSSecretKey { get; }
    string AWSBucket { get; }
    string YouTubeKey { get;  }
    string YouTubeChannelId { get;  }
    string SermonsPlayListId { get; }
  }
}
