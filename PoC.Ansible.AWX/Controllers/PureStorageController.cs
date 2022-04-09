using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;

namespace PoC.Ansible.AWX.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PureStorageController : BaseControllerBase
    {
        public string _Urlapitoken = "https://10.202.2.15/api/1.19/";

       
        public PureStorageController()
        {
            //_logger = logger;
        }

        [HttpPost("APIToken")]
        public object APIToken()
        {  
            var AuthData = new AuthData();
            AuthData.username = "";
                AuthData.password = "";

            var client = new RestClient(_Urlapitoken+ "auth/apitoken");
            var request = new RestRequest();
            request.RequestFormat = DataFormat.Json;
            request.Method = Method.Post;
            request.AddHeader("Accept", "application/json");
            request.AddJsonBody(AuthData);

            var response = client.ExecuteAsync(request).Result;
            Console.WriteLine(response.Content);
            return response.Content;
        }

        [HttpPost("APISessionn")]
        public object APISessionn()
        {
            var AuthData = new AuthData();
            AuthData.apitoken = APIToken().ToString();

            var client = new RestClient(_Urlapitoken + "auth/session");
            var request = new RestRequest();
            request.RequestFormat = DataFormat.Json;
            request.Method = Method.Post;
            request.AddHeader("Accept", "application/json");
            request.AddJsonBody(AuthData);

            var response = client.ExecuteAsync(request).Result;
            Console.WriteLine(response.Content);
            return response.Content;
        }


        [HttpPost("GetVolume")]
        public object GetVolume()
        {
            var AuthData = new AuthData();
            AuthData.apitoken = APIToken().ToString();

            var client = new RestClient(_Urlapitoken + "volume");
            var request = new RestRequest();
            request.RequestFormat = DataFormat.Json;
            request.Method = Method.Post;
            request.AddHeader("Accept", "application/json");
            request.AddJsonBody(AuthData);

            var response = client.ExecuteAsync(request).Result;
            Console.WriteLine(response.Content);
            return response.Content;
        }
    }

    
}

public class AuthData
    {
        public string username { get; set; }
        public string password { get; set; }

        public string apitoken { get; set; }
    }
   

