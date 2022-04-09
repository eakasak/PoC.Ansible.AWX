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
    public class AWXJobTemplateController : BaseControllerBase
    {
        public string _UrlAwx = "http://10.202.3.212/api/v2/";

       
        public AWXJobTemplateController()
        {
            //_logger = logger;
        }

        [HttpPost("CallTemplate")]
        public object CallTemplate(jobs jobs)
        {
            var VMTemplate = new VMTemplate();        
            var ExtraVars = new ExtraVars();

            ExtraVars.vm_hostname = _vm_hostname;
            ExtraVars.vm_username = _vm_username;
            ExtraVars.vm_password = _vm_password;

            //ExtraVars.vm_name = "Ansible-RedisCluster-A10";
            //ExtraVars.ip = "10.100.65.210";

            ExtraVars.vm_name = jobs.vm_name;
            ExtraVars.ip = jobs.ip;

            ExtraVars.template = "D2T-Template-POC-ansible";
            ExtraVars.datacenter = "TMP-VSAN-Datacenter";
            ExtraVars.resource_pool = "Devops-Test";

            ExtraVars.folder = "DevOps - Testing";
            ExtraVars.cluster = "Non-Production-VSAN-Cluster";
            ExtraVars.datastore = "DSC_DB-NONPROD-TRUEID-01";

            ExtraVars.memory_mb = jobs.memory_mb;
            ExtraVars.num_cpus = jobs.num_cpus;
            ExtraVars.hotadd_cpu = "True";
            ExtraVars.hotremove_cpu = "True";
            ExtraVars.hotadd_memory = "True";

            ExtraVars.nw_name = "DB-NON-Production(3265)";
            ExtraVars.nw_netmask = "255.255.255.0";
            ExtraVars.nw_gateway = "10.100.65.1";

            ExtraVars.nw_type = "static";
            ExtraVars.dns_servers1 = "10.198.101.39";
            ExtraVars.dns_servers2 = "10.198.101.40";
            ExtraVars.state = "poweredon";

            VMTemplate.extra_vars = ExtraVars;

            var body = JsonConvert.SerializeObject(VMTemplate);

            var client = new RestClient(_UrlAwx + "job_templates/9/launch/");
            var request = new RestRequest();
            request.RequestFormat = DataFormat.Json;
            request.Method = Method.Post;
            request.AddHeader("Authorization", "Basic ZWFrYXNhay5waWI6Ykd2aE1wMlhXa3RrVzY2aGtjalYjJCU=");
            request.AddHeader("Accept", "application/json");
            //request.Parameters.Clear();
            request.AddJsonBody(VMTemplate);
            //request.AddParameter("application/json", body, ParameterType.RequestBody);

            var response = client.ExecuteAsync(request).Result;
            Console.WriteLine(response.Content);
            return response.Content;
        }


        [HttpGet("GetById/{id}")]
        public object GetById(int id)
         {
             var client = new RestClient(_UrlAwx + "jobs/"+ id +"/job_host_summaries/");
             var request = new RestRequest();
             request.AddHeader("Authorization", "Basic ZWFrYXNhay5waWI6Ykd2aE1wMlhXa3RrVzY2aGtjalYjJCU=");
             var response = client.ExecuteAsync(request).Result;
             Console.WriteLine(response.Content);

             return response.Content;   
         }
    }

    public class jobs
    {
        public string vm_name { get; set; }
        public string ip { get; set; }
        public string memory_mb { get; set; }
        public string num_cpus { get; set; }
    }
    public class ExtraVars
    {
        public string vm_hostname { get; set; }
        public string vm_username { get; set; }
        public string vm_password { get; set; }
        public string vm_name { get; set; }
        public string ip { get; set; }
        public string template { get; set; }
        public string datacenter { get; set; }
        public string resource_pool { get; set; }
        public string folder { get; set; }
        public string cluster { get; set; }
        public string datastore { get; set; }
        public string memory_mb { get; set; }
        public string num_cpus { get; set; }
        public string hotadd_cpu { get; set; }
        public string hotremove_cpu { get; set; }
        public string hotadd_memory { get; set; }
        public string nw_name { get; set; }
        public string nw_netmask { get; set; }
        public string nw_gateway { get; set; }
        public string nw_type { get; set; }
        public string dns_servers1 { get; set; }
        public string dns_servers2 { get; set; }
        public string state { get; set; }
    }

    public class VMTemplate
    {
        public ExtraVars extra_vars { get; set; }
    }


}
