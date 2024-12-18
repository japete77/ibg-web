using Microsoft.AspNetCore.Http;
using System;
using System.Net;

namespace Core.Exceptions
{
    public class AuthenticationException : ExceptionBase
    {
        public AuthenticationException(int code, string message, Exception exception = null, int statusCode = StatusCodes.Status401Unauthorized) : base(code, message, exception, statusCode)
        {
        }
    }
}
