import React, { Component } from 'react';

export class RedisDatabase extends Component {
  static displayName = RedisDatabase.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0,  currentstatus: false, invenid: 0  };
    this.incrementCounter = this.incrementCounter.bind(this);
    this.createInventory = this.createInventory.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
    this.populateAWXJobTemplate();
  }

  createInventory() {
    this.populateCreateInventory();
  }

  render() {
    return (
      <div>
         <h1>Create VM</h1>

<p>This is a simple example of a React component.</p>
{/* {this.state.currentCount} /  */}
{/* <form  class="col-6"> */}
<p aria-live="polite">Current Status: <strong>{this.state.currentstatus.toString()}</strong></p>
<div>
  <label for="vm_name" class="form-label">vm name : Ansible-RedisCluster-A10</label>
  <input type="text" class="form-control" id="vm_name"></input> 
</div>
<div>
  <label for="ip" class="form-label">ip : 10.100.65.210</label>
  <input type="text" class="form-control" id="ip"   ></input> 
</div>
<div>
  <label for="memory_mb" class="form-label">memory mb : 8192</label>
  <input type="text" class="form-control" id="memory_mb" ></input> 
</div>
<div>
  <label for="num_cpus" class="form-label">num cpus : 2</label>
  <input type="text" class="form-control" id="num_cpus"  ></input> 
</div>  
        <h1>Create Redis DB</h1>

        <p>This is a simple example of a React component.</p>
        {/* {this.state.currentCount} /  */}
        {/* <form  class="col-6"> */}
        <p aria-live="polite">Current Status: <strong>{this.state.currentstatus.toString()}</strong></p>
        <div>
          <label for="ip" class="form-label">ip : 10.100.65.210</label>
          <input type="text" class="form-control" id="ip"   ></input> 
        </div>
        <div>
          <label for="redisport" class="form-label">redisport :  7001</label>
          <input type="text" class="form-control" id="redisport"></input> 
        </div>
        <div>
          <label for="nodetimeout" class="form-label">nodetimeout : 5000</label>
          <input type="text" class="form-control" id="nodetimeout" ></input> 
        </div>
        <div>
          <label for="maxclients" class="form-label">maxclients : 50000</label>
          <input type="text" class="form-control" id="maxclients" ></input> 
        </div>
        <div>
          <label for="maxmemory" class="form-label">maxmemory : 4gb</label>
          <input type="text" class="form-control" id="maxmemory"  ></input> 
        </div>  
        <div>
          <label for="requirepass" class="form-label">requirepass : VP53tHYgfxcHRLFDtuLGnmhKXRuUafaN</label>
          <input type="text" class="form-control" id="requirepass"  ></input> 
        </div>  
        <br></br>
        <div>
        <button className="btn btn-primary" onClick={this.incrementCounter}>Create</button>
        </div>
        {/* </form> */}
        <div>
        <button className="btn btn-primary" onClick={this.createInventory}>Create Inventory & host</button>
        </div>
      </div>
    );
  }

  async populateAWXJobTemplate() {

    this.setState({
      currentstatus: false
    });
   var jobs = {};
 
   jobs.redisport = document.getElementById("redisport").value ;
   jobs.ip = document.getElementById("ip").value ;
   jobs.maxmemory = document.getElementById("maxmemory").value ;
   jobs.maxclients = document.getElementById("maxclients").value ;
   jobs.requirepass = document.getElementById("requirepass").value ;
   jobs.nodetimeout = document.getElementById("nodetimeout").value ;
   jobs.invenid =  localStorage.getItem("invenid");

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
   
      if (data2.count !== 0) {  console.log("status",  jobs.ip + "_" +data2.results[0].summary_fields.job.status );
      if(data2.results[0].summary_fields.job.status === "successful")
      {
      i = 1; 
      console.log("status",  jobs.ip + "_" + data.job);
      }      }      
      
    } while (i === 0);
    // console.log("data2",  !data2.results[0].failed);
    this.setState({
      currentstatus: !data2.results[0].failed
    });
    // console.log("data2results", data2.results[0].failed);
  }

  async populateCreateInventory() {
    var jobs = {};
    jobs.ip = document.getElementById("ip").value ;
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
    localStorage.setItem("invenid", data.id);
    console.log("data", data);
    console.log("invenid", this.state.invenid);
    this.setState({
      currentCount: this.state.currentCount + 1
    });
    this.populateAWXJobTemplate();
  }
}
