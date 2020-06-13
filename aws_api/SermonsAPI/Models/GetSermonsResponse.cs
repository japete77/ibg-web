using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GlobalArticleDatabaseAPI.Models
{
  public class GetSermonsResponse
  {
    public int Total { get; set; }
    public int CurrentPage { get; set; }
    public List<Item> Items { get; set; }
  }
}
