﻿using Microsoft.AspNetCore.Hosting;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace GlobalArticleDatabaseAPI
{
    /// <summary>
    /// This class extends from APIGatewayProxyFunction which contains the method FunctionHandlerAsync which is the 
    /// actual Lambda function entry point. The Lambda handler field should be set to
    /// 
    /// AWSServerless1::AWSServerless1.LambdaEntryPoint::FunctionHandlerAsync
    /// </summary>
    public class LambdaEntryPoint :
        // When using an ELB's Application Load Balancer as the event source change 
        // the base class to Amazon.Lambda.AspNetCoreServer.ApplicationLoadBalancerFunction
        Amazon.Lambda.AspNetCoreServer.APIGatewayProxyFunction
    {
        /// <summary>
        /// The builder has configuration, logging and Amazon API Gateway already configured. The startup class
        /// needs to be configured in this method using the UseStartup() method.
        /// </summary>
        /// <param name="builder"></param>
        protected override void Init(IWebHostBuilder builder)
        {
            builder
                .ConfigureServices(services => services.AddAutofac())
                .ConfigureAppConfiguration(x =>
                {
                    x.AddEnvironmentVariables();
                })
                .UseStartup<Startup>();
        }
    }
}