import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0,  currentstatus: false };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
    this.populateAWXJobTemplate();
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
        <br></br>
        <div>
        <button className="btn btn-primary" onClick={this.incrementCounter}>Create</button>
        </div>
        {/* </form> */}
      </div>
    );
  }

  async populateAWXJobTemplate() {
   var jobs = {};
 
   jobs.vm_name = document.getElementById("vm_name").value ;
   jobs.ip = document.getElementById("ip").value ;
   jobs.memory_mb = document.getElementById("memory_mb").value ;
   jobs.num_cpus = document.getElementById("num_cpus").value ;

    this.setState({
      currentstatus: false
    });
    const response = await fetch('api/AWXJobTemplate/CallTemplate', {
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
      const response2 = await fetch('api/AWXJobTemplate/GetById/' + data.job);
      data2 = await response2.json();
      console.log("data2",  data2);
   
      if (data2.count !== 0) {console.log("status",  jobs.ip + "_" +data2.results[0].summary_fields.job.status);  i = 1; }      
      
    } while (i === 0);
    // console.log("data2",  !data2.results[0].failed);
    this.setState({
      currentstatus: !data2.results[0].failed
    });
    // console.log("data2results", data2.results[0].failed);
  }
}
