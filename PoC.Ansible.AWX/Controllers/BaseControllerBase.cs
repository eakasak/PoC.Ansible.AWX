using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoC.Ansible.AWX.Controllers
{
    public abstract class BaseControllerBase : ControllerBase
    {
        public string _vm_hostname = "10.10.15.23";
        public string _vm_username = "eakasak.pib@truedigital.group";
        public string _vm_password = "Truedigital@2021";
        public string _AuthManage = "Basic ZWFrYXNhay5waWI6Ykd2aE1wMlhXa3RrVzY2aGtjalYjJCU=";
        public string _AuthService= "Basic ZWFrYXNhay5waWI6Ykd2aE1wMlhXa3RrVzY2aGtjalYjJCU=";

    }
}
