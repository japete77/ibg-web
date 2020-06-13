using GlobalArticleDatabaseAPI.Models;
using System.Threading.Tasks;

namespace GlobalArticleDatabaseAPI.Services.Sermons.Interfaces
{
  public interface ISermonsService
  {
    Task<GetSermonsResponse> GetSermons(int page, int pageSize);
    Task<GetSeriesResponse> GetSeries(int page, int pageSize);
    Task<GetLiveEventResponse> GetLiveEvent();
    Task CleanUp();
  }
}
