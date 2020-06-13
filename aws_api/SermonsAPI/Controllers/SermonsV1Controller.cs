using GlobalArticleDatabaseAPI.Models;
using GlobalArticleDatabaseAPI.Services.Sermons.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Threading.Tasks;

namespace GlobalArticleDatabaseAPI.Controllers
{
  /// <summary>
  /// Articles management
  /// </summary>
  [Route("/api/v1/")]
  [ApiController]
  [Produces("application/json")]
  public class SermonsV1Controller : ControllerBase
  {
    private readonly ISermonsService _sermonsService;

    public SermonsV1Controller(ISermonsService sermonsService)
    {
      _sermonsService = sermonsService ?? throw new ArgumentNullException(nameof(sermonsService));
    }

    /// <summary>
    /// Get sermons
    /// </summary>
    /// <param name="page">Page number</param>
    /// <param name="pageSize">Number of elements per page</param>
    /// <returns>Page of sermons</returns>
    [Route("sermons")]
    [HttpGet]
    public async Task<GetSermonsResponse> GetSermons([Required]int page, [Required]int pageSize)
    {
      return await _sermonsService.GetSermons(page, pageSize);
    }

    /// <summary>
    /// Get series
    /// </summary>
    /// <param name="page">Page number. Starting from 1.</param>
    /// <param name="pageSize">Number of elements per page</param>
    /// <returns>Page of series</returns>
    [Route("series")]
    [HttpGet]
    public async Task<GetSeriesResponse> GetSeries([Required]int page, [Required]int pageSize)
    {
      return await _sermonsService.GetSeries(page, pageSize);
    }

    /// <summary>
    /// Get live event info
    /// </summary>
    [Route("live")]
    [HttpGet]
    public async Task<GetLiveEventResponse> GetLive()
    {
      return await _sermonsService.GetLiveEvent();
    }

    /// <summary>
    /// Clean up cache
    /// </summary>
    [Route("refresh")]
    [HttpGet]
    public async Task Refresh()
    {
      await _sermonsService.CleanUp();
    }
  }
}
