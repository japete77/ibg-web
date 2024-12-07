using System;
using System.Net;

public class ExceptionBase : Exception
{
  public int Code { get; }
  public int HttpCode { get; }
  public string UserMessage { get; }

  // Parameterless constructor
  public ExceptionBase()
  {
  }

  // Constructor with message
  public ExceptionBase(string message) : base(message)
  {
  }

  // Constructor with message and inner exception
  public ExceptionBase(string message, Exception innerException) : base(message, innerException)
  {
  }

  // Custom constructor
  public ExceptionBase(int code, string userMessage, Exception innerException = null, int httpCode = (int)HttpStatusCode.InternalServerError)
      : base(innerException?.Message, innerException)
  {
    Code = code;
    HttpCode = (int)httpCode;
    UserMessage = userMessage;
  }

  // If you still need serialization (not recommended)
  // Uncomment the following lines
  /*
  protected ExceptionBase(SerializationInfo info, StreamingContext context) : base(info, context)
  {
      Code = info.GetInt32(nameof(Code));
      HttpCode = info.GetInt32(nameof(HttpCode));
      UserMessage = info.GetString(nameof(UserMessage));
  }

  public override void GetObjectData(SerializationInfo info, StreamingContext context)
  {
      base.GetObjectData(info, context);
      info.AddValue(nameof(Code), Code);
      info.AddValue(nameof(HttpCode), HttpCode);
      info.AddValue(nameof(UserMessage), UserMessage);
  }
  */
}
