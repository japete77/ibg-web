using Config.Interfaces;
using GlobalArticleDatabaseAPI.Models;
using GlobalArticleDatabaseAPI.Services.Youtube.Interface;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace GlobalArticleDatabaseAPI.Services.Youtube.Implementations
{
  public class YouTubeService : IYouTubeService
  {
    private readonly ISettings _settings;
    private readonly HttpClient _client;
    public YouTubeService(ISettings settings)
    {
      _settings = settings ?? throw new ArgumentNullException(nameof(settings));

      _client = new HttpClient();
      _client.BaseAddress = new Uri("https://www.googleapis.com/youtube/v3/");
    }

    public async Task<GetItemsResponse> GetLiveEvent()
    {
      var url = $"search?part=snippet&type=video&eventType=live&channelId={_settings.YouTubeChannelId}&key={_settings.YouTubeKey}";

      var response = await _client.GetAsync(url);

      return JsonConvert.DeserializeObject<GetItemsResponse>(await response.Content.ReadAsStringAsync());
    }

    public async Task<GetItemsResponse> GetSeries(string pageToken)
    {
      var url = $"playlists?part=snippet&order=date&maxResults=50&channelId={_settings.YouTubeChannelId}&key={_settings.YouTubeKey}";
      if (!string.IsNullOrEmpty(pageToken))
      {
        url += $"pageToken={pageToken}";
      }

      var response = await _client.GetAsync(url);

      return JsonConvert.DeserializeObject<GetItemsResponse>(await response.Content.ReadAsStringAsync());
    }

    public async Task<GetItemsResponse> GetSermons(string pageToken)
    {
      var url = $"playlistItems?part=snippet&playlistId={_settings.SermonsPlayListId}&maxResults=50&channelId={_settings.YouTubeChannelId}&key={_settings.YouTubeKey}";
      if (!string.IsNullOrEmpty(pageToken ))
      {
        url += $"&pageToken={pageToken}";
      }

      var response = await _client.GetAsync(url);

      var data = JsonConvert.DeserializeObject<GetItemsResponse>(await response.Content.ReadAsStringAsync());

      data?.items?.ForEach(item =>
      {
        if (item!= null && item.snippet!= null && item.snippet.description != null)
        {
          var lines = item.snippet.description.Split(new string[] { "\n" }, StringSplitOptions.None);
          if (lines.Length > 1)
          {            
            if (DateTime.TryParse(lines[1], out var date))
            {
              item.snippet.description = lines[0];
              item.snippet.publishedAt = date;
            }
          }
        }        
      });

      return data;
    }
  }
}
