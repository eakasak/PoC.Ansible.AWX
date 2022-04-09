import React, { Component } from 'react';

export class VCenter extends Component {
  static displayName = VCenter.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
      this.populateWeatherData();
  }

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
            <th>Testconnect</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
              <td><button type="button">Connect</button></td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : VCenter.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >vCenter</h1>
        {/* <p>This component demonstrates fetching data from the server.</p> */}
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast/GetVCenter');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
    }


    
}
