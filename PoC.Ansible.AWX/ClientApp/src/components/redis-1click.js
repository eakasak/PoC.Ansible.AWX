import React, { Component } from 'react';

export class Redis1Click extends Component {
  static displayName = Redis1Click.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0, currentstatus: false, invenid: 0, ip : ""  };
    this.incrementCounter = this.incrementCounter.bind(this);
    this.createInventory = this.createInventory.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
    this.populateAWXJobTemplate();
    localStorage.setItem("rediscount", 0);
   
  }

  createInventory() {
    this.populateCreateInventory();
  }

  render() {
    return (
      <div>
        <h3>VM Setting</h3>
        {/* {this.state.currentCount} /  */}
        {/* <form  class="col-6"> */}
        <p aria-live="polite">Current Status: <strong>{this.state.currentstatus.toString()}</strong></p>
        <p aria-live="polite">Current ip: <strong>{this.state.ip.toString()}</strong></p>
        <div>
          {/* <label for="vm_name" class="form-label">vm name : Ansible-RedisCluster-A10</label> */}
          <input type="text" id="vm_name1" placeholder="vm_name"></input>
          <input type="text" id="ip1" placeholder="ip"></input>
          <input type="text" id="memory_mb1" placeholder="memory_mb"></input>
          <input type="text" id="num_cpus1" placeholder="num_cpus"></input>
        </div>
        <div>
          <input type="text" id="vm_name2" placeholder="vm_name"></input>
          <input type="text" id="ip2" placeholder="ip"></input>
          <input type="text" id="memory_mb2" placeholder="memory_mb"></input>
          <input type="text" id="num_cpus2" placeholder="num_cpus"></input>
        </div>
        <div>
          <input type="text" id="vm_name3" placeholder="vm_name"></input>
          <input type="text" id="ip3" placeholder="ip"></input>
          <input type="text" id="memory_mb3" placeholder="memory_mb"></input>
          <input type="text" id="num_cpus3" placeholder="num_cpus"></input>
        </div>
        <div>
          <input type="text" id="vm_name4" placeholder="vm_name"></input>
          <input type="text" id="ip4" placeholder="ip"></input>
          <input type="text" id="memory_mb4" placeholder="memory_mb"></input>
          <input type="text" id="num_cpus4" placeholder="num_cpus"></input>
        </div>
        <div>
          <input type="text" id="vm_name5" placeholder="vm_name"></input>
          <input type="text" id="ip5" placeholder="ip"></input>
          <input type="text" id="memory_mb5" placeholder="memory_mb"></input>
          <input type="text" id="num_cpus5" placeholder="num_cpus"></input>
        </div>
        <div>
          <input type="text" id="vm_name6" placeholder="vm_name"></input>
          <input type="text" id="ip6" placeholder="ip"></input>
          <input type="text" id="memory_mb6" placeholder="memory_mb"></input>
          <input type="text" id="num_cpus6" placeholder="num_cpus"></input>
        </div>
        <h3>Redis DB Setting</h3>

        {/* {this.state.currentCount} /  */}
        {/* <form  class="col-6"> */}
        <p aria-live="polite">Current Status: <strong>{this.state.currentstatus.toString()}</strong></p>
        {/* <div>
          <label for="ip" class="form-label">ip : 10.100.65.210</label>
          <input type="text" class="form-control" id="ip"   ></input> 
        </div> */}
        <div>
          {/* <label for="redisport" >redisport :  7001</label> */}
          <input type="text" id="redisport" placeholder="redisport"></input>
          <input type="text" id="nodetimeout" placeholder="nodetimeout"></input>
          <input type="text" id="maxclients" placeholder="maxclients"></input>
          <input type="text" id="maxmemory" placeholder="maxmemory"></input>
          <input type="text" id="requirepass" placeholder="requirepass"></input>
        </div>
        <div>
          {/* <label for="nodetimeout" class="form-label">nodetimeout : 5000</label>
          <input type="text" class="form-control" id="nodetimeout" ></input>  */}
        </div>
        <div>
          {/* <label for="maxclients" class="form-label">maxclients : 50000</label>
          <input type="text" class="form-control" id="maxclients" ></input>  */}
        </div>
        <div>
          {/* <label for="maxmemory" class="form-label">maxmemory : 4gb</label>
          <input type="text" class="form-control" id="maxmemory"  ></input>  */}
        </div>
        <div>
          {/* <label for="requirepass" class="form-label">requirepass : VP53tHYgfxcHRLFDtuLGnmhKXRuUafaN</label>
          <input type="text" class="form-control" id="requirepass"  ></input>  */}
        </div>
        <br></br>
        <h1>Make Redis DB Cluster</h1>

<p>This is a simple example of a React component.</p>
{/* {this.state.currentCount} /  */}
{/* <form  class="col-6"> */}
<p aria-live="polite">Current Status: <strong>{this.state.currentstatus.toString()}</strong></p>
<div>
  <label for="clustercmd" class="form-label">cmd : redis-cli -a VP53tHYgfxcHRLFDtuLGnmhKXRuUafaN --cluster create 10.100.65.201:7001 10.100.65.202:7001 10.100.65.203:7001 10.100.65.204:7001 10.100.65.205:7001 10.100.65.206:7001 --cluster-replicas 1 --cluster-yes</label>
  <input type="text" class="form-control" id="clustercmd"   ></input> 
</div>
       <br></br>
<div>
<button className="btn btn-primary" onClick={this.incrementCounter}>Create</button>
</div>
      
        {/* </form> */}
        {/* <div>
        <button className="btn btn-primary" onClick={this.createInventory}>Create Inventory & host</button>
        </div> */}
      </div>
    );
  }

  async  populateAWXJobTemplate() {

    this.setState({
      currentstatus: false
    });
  

    var job1 = {};
    job1.vm_name = document.getElementById("vm_name1").value ;
    job1.ip = document.getElementById("ip1").value ;
    job1.memory_mb = document.getElementById("memory_mb1").value ;
    job1.num_cpus = document.getElementById("num_cpus1").value ;
    this.populateCallTemplate(job1);
    console.log("job1", job1);

    var job2 = {};
    job2.vm_name = document.getElementById("vm_name2").value ;
    job2.ip = document.getElementById("ip2").value ;
    job2.memory_mb = document.getElementById("memory_mb2").value ;
    job2.num_cpus = document.getElementById("num_cpus2").value ;
    this.populateCallTemplate(job2);
    console.log("job2", job2);

    var job3 = {};
    job3.vm_name = document.getElementById("vm_name3").value ;
    job3.ip = document.getElementById("ip3").value ;
    job3.memory_mb = document.getElementById("memory_mb3").value ;
    job3.num_cpus = document.getElementById("num_cpus3").value ;
    this.populateCallTemplate(job3);
    console.log("job3", job3);

    var job4 = {};

    job4.vm_name = document.getElementById("vm_name4").value ;
    job4.ip = document.getElementById("ip4").value ;
    job4.memory_mb = document.getElementById("memory_mb4").value ;
    job4.num_cpus = document.getElementById("num_cpus4").value ;
    this.populateCallTemplate(job4);
    console.log("job4", job4);

    var job5 = {};
    job5.vm_name = document.getElementById("vm_name5").value ;
    job5.ip = document.getElementById("ip5").value ;
    job5.memory_mb = document.getElementById("memory_mb5").value ;
    job5.num_cpus = document.getElementById("num_cpus5").value ;
    this.populateCallTemplate(job5);
    console.log("job5", job5);

    var job6 = {};
    job6.vm_name = document.getElementById("vm_name6").value ;
    job6.ip = document.getElementById("ip6").value ;
    job6.memory_mb = document.getElementById("memory_mb6").value ;
    job6.num_cpus = document.getElementById("num_cpus6").value ;
    this.populateCallTemplate(job6);
    console.log("job6", job6);  
  }

  async populateCallTemplate(job) {
    this.setState({
      currentstatus: false, 
      ip : job.ip
    });
    const response = await fetch('api/AWXJobTemplate/CallTemplate', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    const data = await response.json();
    //this.setState({ forecasts: data, loading: false });
    // console.log("data", this.state.currentstatus.toString());
  
    var i = 0 ;
    var data2;
    do {
      await new Promise(resolve => setTimeout(resolve, 3000))
      const response2 = await fetch('api/AWXJobTemplate/GetById/' + data.job);
      data2 = await response2.json();
      //console.log("data2",  !data2.results[0].failed);
   
      if (data2.count !== 0) { i = 1; }      
      
    } while (i === 0);
    // console.log("data2",  !data2.results[0].failed);
    this.setState({
      currentstatus: !data2.results[0].failed
    });
   
    this.populateAWXCreateInventory(job.ip);
  }
  
  async populateAWXCreateInventory(ip) {
    await new Promise(resolve => setTimeout(resolve, 43000))
    var jobs = {};
    jobs.ip = ip;
    const response = await fetch('api/AWXJobRedis/CreateInventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobs),
    });
    const data = await response.json();
    console.log("data", data.id);
    this.setState({
      invenid: data.id
    });
    localStorage.setItem("invenid"+ip, data.id);
    console.log("data.id",  data.id);
    console.log("invenid", this.state.invenid);
    this.populateAWXRedisJobTemplate(ip);
  }

  async populateAWXRedisJobTemplate(ip) {
    await new Promise(resolve => setTimeout(resolve, 43000))
    this.setState({
      currentstatus: false
    });
   var jobs = {};
 
   jobs.redisport = document.getElementById("redisport").value ;
   jobs.ip = ip ;
   jobs.maxmemory = document.getElementById("maxmemory").value ;
   jobs.maxclients = document.getElementById("maxclients").value ;
   jobs.requirepass = document.getElementById("requirepass").value ;
   jobs.nodetimeout = document.getElementById("nodetimeout").value ;
   jobs.invenid =  localStorage.getItem("invenid"+ip);

    const response = await fetch('api/AWXJobRedis/CallTemplate', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobs),
    });
    const data = await response.json();
    //this.setState({ forecasts: data, loading: false });
    // console.log("data", this.state.currentstatus.toString());
  
    var i = 0 ;
    var data2;
    do {
      await new Promise(resolve => setTimeout(resolve, 3000))
      const response2 = await fetch('api/AWXJobRedis/GetById/' + data.job);
      data2 = await response2.json();
      //console.log("data2",  !data2.results[0].failed);

      if (data2.count !== 0) { 
        // console.log("status",  ip + "_" +data2.results[0].status);
        if(data2.results[0].summary_fields.job.status === "successful")
        {
        i = 1;  
        var rediscount =  localStorage.getItem("rediscount");
        localStorage.setItem("rediscount", rediscount+1);
          console.log("status", ip + "_" + data.job);
          var strrediscount = "";

          strrediscount = localStorage.getItem("rediscount");
          console.log("strrediscount", strrediscount);

          if (strrediscount === "0111111") {
            this.populateAWXJobClustercmd();
          }
        }      
        } 
    } while (i === 0);


    this.setState({
      currentstatus: !data2.results[0].failed
    });
    // console.log("data2results", data2.results[0].failed);
  }

  async populateAWXJobClustercmd() {
    var jobs = {};
  
    jobs.clustercommand = document.getElementById("clustercmd").value ;
   
     this.setState({
       currentstatus: false
     });
     const response = await fetch('api/AWXJobRedis/MakeCluster', {
       method: 'POST', 
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(jobs),
     });
     const data = await response.json();
 
     var i = 0 ;
     var data2;
     do {
       await new Promise(resolve => setTimeout(resolve, 3000))
       const response2 = await fetch('api/AWXJobRedis/GetById/' + data.job);
       data2 = await response2.json();
       console.log("data2",   data2);
  
       if (data2.count !== 0) {        
          i = 1;          
       }
     } while (i === 0);
     // console.log("data2",  !data2.results[0].failed);
     this.setState({
       currentstatus: !data2.results[0].failed
     });
     // console.log("data2results", data2.results[0].failed);
 
   }
  
}
