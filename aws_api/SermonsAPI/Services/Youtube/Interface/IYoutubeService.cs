using GlobalArticleDatabaseAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GlobalArticleDatabaseAPI.Services.Youtube.Interface
{
  public interface IYouTubeService
  {
    Task<GetItemsResponse> GetSermons(string pageToken);
    Task<GetItemsResponse> GetSeries(string pageToken);
    Task<GetItemsResponse> GetLiveEvent();
  }
}
