import React, { Component } from 'react';

export class RedisCluster extends Component {
  static displayName = RedisCluster.name;

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
      </div>
    );
  }

  async populateAWXJobTemplate() {
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
      //console.log("data2",  !data2.results[0].failed);
   
      if (data2.count !== 0) { i = 1; }      
      
    } while (i === 0);
    // console.log("data2",  !data2.results[0].failed);
    this.setState({
      currentstatus: !data2.results[0].failed
    });
    // console.log("data2results", data2.results[0].failed);

  }
}

