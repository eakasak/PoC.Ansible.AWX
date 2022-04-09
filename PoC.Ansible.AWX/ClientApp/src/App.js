import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { RedisDatabase } from './components/redis-database';
import { RedisCluster } from './components/redis-cluster';
import { Redis1Click } from './components/redis-1click';
import { VCenter } from './components/vcenter';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/redis-database' component={RedisDatabase} />
        <Route path='/redis-cluster' component={RedisCluster} />
        <Route path='/redis-1click' component={Redis1Click} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/vcenter' component={VCenter} />
      </Layout>
    );
  }
}
