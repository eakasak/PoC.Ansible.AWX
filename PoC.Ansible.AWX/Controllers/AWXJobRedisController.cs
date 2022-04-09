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
    public class AWXJobRedisController : BaseControllerBase
    {
        public string _UrlAwx = "http://10.100.65.212/api/v2/";

        public AWXJobRedisController()
        {
            //_logger = logger;
        }

        [HttpPost("CallTemplate")]
        public object CallTemplate(RedisExtraVars redisreq)
        {
            var RedisExtraVar = new RedisExtraVar();
            var ExtraVars = new RedisExtraVars();

            ExtraVars.ip = redisreq.ip;
            ExtraVars.redisport = redisreq.redisport;
            ExtraVars.nodetimeout = redisreq.nodetimeout;
            ExtraVars.maxclients = redisreq.maxclients;
            ExtraVars.maxmemory = redisreq.maxmemory;
            ExtraVars.requirepass = redisreq.requirepass;


            RedisExtraVar.extra_vars = ExtraVars;
            RedisExtraVar.inventory = redisreq.invenid;

            var body = JsonConvert.SerializeObject(RedisExtraVar);

            var client = new RestClient(_UrlAwx + "job_templates/9/launch/");
            var request = new RestRequest();
            request.RequestFormat = DataFormat.Json;
            request.Method = Method.Post;
            request.AddHeader("Authorization", _AuthService);
            request.AddHeader("Accept", "application/json");
            //request.Parameters.Clear();
            request.AddJsonBody(RedisExtraVar);
            //request.AddParameter("application/json", body, ParameterType.RequestBody);

            var response = client.ExecuteAsync(request).Result;
            Console.WriteLine(response.Content);
            return response.Content;
        }


        [HttpGet("GetById/{id}")]
        public object GetById(int id)
        {
            var client = new RestClient(_UrlAwx + "jobs/" + id + "/job_host_summaries/");
            var request = new RestRequest();
            request.AddHeader("Authorization", _AuthService);
            var response = client.ExecuteAsync(request).Result;
            Console.WriteLine(response.Content);

            return response.Content;
        }


        [HttpPost("MakeCluster")]
        public object MakeCluster(RedisExtraVars redisreq)
        {
            var RedisExtraVar = new RedisExtraVar();
            var ExtraVars = new RedisExtraVars();

            ExtraVars.clustercommand = redisreq.clustercommand;

            RedisExtraVar.extra_vars = ExtraVars;
            RedisExtraVar.inventory = "3";
            //var body = JsonConvert.SerializeObject(RedisExtraVar);

            var client = new RestClient(_UrlAwx + "job_templates/11/launch/");
            var request = new RestRequest();
            request.RequestFormat = DataFormat.Json;
            request.Method = Method.Post;
            request.AddHeader("Authorization", _AuthService);
            request.AddHeader("Accept", "application/json");
            //request.Parameters.Clear();
            request.AddJsonBody(RedisExtraVar);

            var response = client.ExecuteAsync(request).Result;
            Console.WriteLine(response.Content);
            return response.Content;
        }

        [HttpPost("CreateInventory")]
        public object CreateInventory(RedisExtraVars redisreq)
        {
            //Random _random = new Random();
            var Inventory = new Inventory();
            String guid = System.Guid.NewGuid().ToString("D");

            Inventory.name = "Inven-"+ redisreq.ip +"-" + guid;
            Inventory.description = "";
            Inventory.organization = 1;
            Inventory.kind = "";
            Inventory.host_filter = "";
            Inventory.variables = "";
            Inventory.insights_credential = "";

            var body = JsonConvert.SerializeObject(Inventory);

            var client = new RestClient(_UrlAwx + "inventories/");
            var request = new RestRequest();
            request.RequestFormat = DataFormat.Json;
            request.Method = Method.Post;
            request.AddHeader("Authorization", _AuthService);
            request.AddHeader("Accept", "application/json");
            //request.Parameters.Clear();
            request.AddJsonBody(Inventory);
            //request.AddParameter("application/json", body, ParameterType.RequestBody);

            var response = client.ExecuteAsync(request).Result;
            Console.WriteLine(response.Content);
            var myDeserializedClass = JsonConvert.DeserializeObject<inventories>(response.Content);
            Host pHost  = new Host();
            pHost.inventory = myDeserializedClass.id;
            pHost.name = redisreq.ip;
            pHost.description = pHost.description;
            pHost.inventory = pHost.inventory;
            pHost.enabled = true;
            pHost.instance_id = pHost.instance_id;
            pHost.variables = pHost.variables;

            CreateHost(pHost);

            return response.Content;
        }
        private object CreateHost(Host pHost)
        {
            //var body = JsonConvert.SerializeObject(pHost);

            var client = new RestClient(_UrlAwx + "hosts/");
            var request = new RestRequest();
            request.RequestFormat = DataFormat.Json;
            request.Method = Method.Post;
            request.AddHeader("Authorization", _AuthService);
            request.AddHeader("Accept", "application/json");
            //request.Parameters.Clear();
            request.AddJsonBody(pHost);
            //request.AddParameter("application/json", body, ParameterType.RequestBody);

            var response = client.ExecuteAsync(request).Result;
            Console.WriteLine(response.Content);
            return response.Content;
        }

        [HttpPost("JobsStatus")]
        public object JobsStatus(Jobs Jobs)
        {
            var RedisExtraVar = new RedisExtraVar();
            var ExtraVars = new RedisExtraVars();

            //ExtraVars.clustercommand = redisreq.clustercommand;

            RedisExtraVar.extra_vars = ExtraVars;
            RedisExtraVar.inventory = "3";
            //var body = JsonConvert.SerializeObject(RedisExtraVar);

            var client = new RestClient(_UrlAwx + "/jobs/" + "");
            var request = new RestRequest();
            request.RequestFormat = DataFormat.Json;
            request.Method = Method.Post;
            request.AddHeader("Authorization", _AuthService);
            request.AddHeader("Accept", "application/json");
            //request.Parameters.Clear();
            request.AddJsonBody(RedisExtraVar);

            var response = client.ExecuteAsync(request).Result;
            Console.WriteLine(response.Content);
            return response.Content;
        }


    }
    public class Jobs
    {
        public int[] JobId { get; set; }
    }
    public class inventories
    {
        public int id { get; set; }
    }

    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Host
    {
        public string name { get; set; }
        public string description { get; set; }
        public int inventory { get; set; }
        public bool enabled { get; set; }
        public string instance_id { get; set; }
        public string variables { get; set; }

    }

    //public class redisreq
    //{
    //    public string ip { get; set; }
    //    public string redisport { get; set; }
    //    public string nodetimeout { get; set; }
    //    public string maxclients { get; set; }
    //    public string maxmemory { get; set; }
    //}

    public class RedisExtraVars
    {
        public string ip { get; set; }
        public string redisport { get; set; }
        public string nodetimeout { get; set; }
        public string maxclients { get; set; }
        public string maxmemory { get; set; }
        public string requirepass { get; set; }
        public string clustercommand { get; set; }
        public string inventoryName { get; set; }
        public string invenid { get; set; }
    }

    public class RedisExtraVar
    {
        public RedisExtraVars extra_vars { get; set; }
        public string inventory { get; set; }
}

    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Inventory
    {
        public string name { get; set; }
        public string description { get; set; }
        public int organization { get; set; }
        public string kind { get; set; }
        public object host_filter { get; set; }
        public string variables { get; set; }
        public object insights_credential { get; set; }
    }

}
