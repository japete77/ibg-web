using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace GlobalArticleDatabaseAPI.Filters
{
  public class SecurityFilter : Attribute, IAuthorizationFilter
  {
    IHttpContextAccessor _httpContext { get; }

    public SecurityFilter(IHttpContextAccessor httpContext)
    {
      _httpContext = httpContext ?? throw new ArgumentNullException(nameof(httpContext));
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
    }
  }
}
