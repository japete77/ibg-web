using Amazon.S3;
using Amazon.S3.Model;
using Config.Interfaces;
using GlobalArticleDatabaseAPI.Models;
using GlobalArticleDatabaseAPI.Services.Articles.Interfaces;
using GlobalArticleDatabaseAPI.Services.Sermons.Interfaces;
using GlobalArticleDatabaseAPI.Services.Youtube.Interface;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GlobalArticleDatabaseAPI.Services.Sermons.Implementations
{
  public class SermonsService : ISermonsService
  {
    private const string seriesFile = "series.json";
    private const string sermonsFile = "sermons.json";
    private const string liveEventsFile = "live.json";

    private List<Item> _series = null;
    private DateTime _lastRefreshSeries = DateTime.UtcNow;

    private List<Item> _sermons = null;
    private DateTime _lastRefreshSermons = DateTime.UtcNow;

    private List<Item> _liveEvents = null;
    private DateTime _lastRefreshLive = DateTime.UtcNow;

    private readonly IYouTubeService _youtubeService;
    private readonly IS3Client _s3Client;
    private readonly ISettings _settings;

    public SermonsService(IYouTubeService youtubeService, IS3Client s3Client, ISettings settings)
    {
      _youtubeService = youtubeService ?? throw new ArgumentNullException(nameof(youtubeService));
      _s3Client = s3Client ?? throw new ArgumentNullException(nameof(s3Client));
      _settings = settings ?? throw new ArgumentNullException(nameof(settings));
    }

    public async Task<GetLiveEventResponse> GetLiveEvent()
    {
      if (_liveEvents == null) await RefreshLiveEvents();

      if (_lastRefreshLive < DateTime.UtcNow.AddDays(-1))
      {
        await CleanUpLive();
        await RefreshLiveEvents();
      }

      var liveEvent = _liveEvents.FirstOrDefault();

      if (liveEvent != null)
      {
        return new GetLiveEventResponse { Live = liveEvent };
      }

      return null;
    }

    public async Task<GetSeriesResponse> GetSeries(int page, int pageSize)
    {
      if (_series == null) await RefreshSeries();

      if (_lastRefreshSeries < DateTime.UtcNow.AddDays(-1))
      {
        await CleanUpSeries();
        await RefreshSeries();
      }

      var items = _series.Skip((page - 1) * pageSize).Take(pageSize).ToList();

      return new GetSeriesResponse
      {
        CurrentPage = page,
        Total = _series.Count,
        Items = items
      };
    }

    public async Task<GetSermonsResponse> GetSermons(int page, int pageSize)
    {
      if (_sermons == null) await RefreshSermons();

      if (_lastRefreshSermons < DateTime.UtcNow.AddDays(-1))
      {
        await CleanUpSermons();
        await RefreshSermons();
      }

      var items = _sermons.Skip((page - 1) * pageSize).Take(pageSize).ToList();

      return new GetSermonsResponse
      {
        CurrentPage = page,
        Total = _sermons.Count,
        Items = items
      };
    }

    public async Task CleanUp()
    {
      await CleanUpLive();
      await CleanUpSeries();
      await CleanUpSermons();
    }

    private async Task CleanUpSeries()
    {
      if (_series != null)
      {
        _series.Clear();
        _series = null;
      }

      try
      {
        await _s3Client.GetClient().DeleteObjectAsync(new DeleteObjectRequest
        {
          BucketName = _settings.AWSBucket,
          Key = seriesFile
        });
      }
      catch (AmazonS3Exception ex)
      {
        if (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
          return;
        }

        throw ex;
      }
    }

    private async Task CleanUpSermons()
    {
      if (_sermons != null)
      {
        _sermons.Clear();
        _sermons = null;
      }

      try
      {
        await _s3Client.GetClient().DeleteObjectAsync(new DeleteObjectRequest
        {
          BucketName = _settings.AWSBucket,
          Key = sermonsFile
        });
      }
      catch (AmazonS3Exception ex)
      {
        if (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
          return;
        }

        throw ex;
      }
    }

    private async Task CleanUpLive()
    {
      if (_liveEvents != null)
      {
        _liveEvents.Clear();
        _liveEvents = null;
      }

      try
      {
        await _s3Client.GetClient().DeleteObjectAsync(new DeleteObjectRequest
        {
          BucketName = _settings.AWSBucket,
          Key = liveEventsFile
        });
      }
      catch (AmazonS3Exception ex)
      {
        if (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
          return;
        }

        throw ex;
      }
    }

    private async Task RefreshSeries()
    {
      _series = await RetrieveItemsFromFile(seriesFile);

      if (_series == null)
      {
        // Retrieve from youtube
        _series = await RetrieveSeriesFromYoutube();

        // Save to S3 (cache)
        await SaveItemsToFile(seriesFile, _series);

        // update last refresh
        _lastRefreshSeries = DateTime.UtcNow;
      }
    }

    private async Task RefreshSermons()
    {
      _sermons = await RetrieveItemsFromFile(sermonsFile);

      if (_sermons == null)
      {
        // Retrieve from youtube
        _sermons = await RetrieveSermonsFromYoutube();

        // Save to S3 (cache)
        await SaveItemsToFile(sermonsFile, _sermons);

        // update last refresh
        _lastRefreshSermons = DateTime.UtcNow;
      }
    }

    private async Task RefreshLiveEvents()
    {
      _liveEvents = await RetrieveItemsFromFile(liveEventsFile);

      if (_liveEvents == null)
      {
        // Retrieve from youtube
        _liveEvents = await RetrieveLiveFromYoutube();

        // Save to S3 (cache)
        await SaveItemsToFile(liveEventsFile, _liveEvents);

        // update last refresh
        _lastRefreshLive = DateTime.UtcNow;
      }
    }

    private async Task<List<Item>> RetrieveItemsFromFile(string filename)
    {
      try
      {
        var response = await _s3Client.GetClient().GetObjectAsync(new GetObjectRequest
        {
          BucketName = _settings.AWSBucket,
          Key = filename
        });

        // Update last modified
        switch (filename)
        {
          case liveEventsFile:
            _lastRefreshLive = response.LastModified.ToUniversalTime();
            break;
          case seriesFile:
            _lastRefreshSeries = response.LastModified.ToUniversalTime();
            break;
          case sermonsFile:
            _lastRefreshSermons = response.LastModified.ToUniversalTime();
            break;
        }

        using (var reader = new StreamReader(response.ResponseStream))
        {
          return JsonConvert.DeserializeObject<List<Item>>(reader.ReadToEnd());
        }

      }
      catch (AmazonS3Exception ex)
      {
        if (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
          return null;
        }

        throw ex;
      }
    }

    private async Task SaveItemsToFile(string filename, List<Item> data)
    {
      var putResponse = await _s3Client.GetClient().PutObjectAsync(new PutObjectRequest
      {
        BucketName = _settings.AWSBucket,
        Key = filename,
        ContentBody = JsonConvert.SerializeObject(data)
      });
    }

    private async Task<List<Item>> RetrieveSeriesFromYoutube()
    {
      List<Item> results = new List<Item>();

      string nextTokenPage = null;

      do
      {
        var response = await _youtubeService.GetSeries(nextTokenPage);

        if (response != null)
        {
          nextTokenPage = response.nextPageToken;
          results.AddRange(response.items);
        }

      } while (nextTokenPage != null);

      return results;
    }

    private async Task<List<Item>> RetrieveSermonsFromYoutube()
    {
      List<Item> results = new List<Item>();

      string nextTokenPage = null;

      do
      {
        var response = await _youtubeService.GetSermons(nextTokenPage);

        if (response != null)
        {
          nextTokenPage = response.nextPageToken;
          results.AddRange(response.items);
        }

      } while (nextTokenPage != null);

      return results;
    }

    private async Task<List<Item>> RetrieveLiveFromYoutube()
    {
      var response = await _youtubeService.GetLiveEvent();

      if (response != null)
      {
        return response.items;
      }

      return null;
    }
  }
}
