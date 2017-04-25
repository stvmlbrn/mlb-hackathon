import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import '../css/bootstrap.css';
import '../css/main.css';
import '../css/icon-sets.css';

import './vendors/bootstrap/bootstrap';
import './vendors/klorofil';

import Layout from './components/layouts/Layout';
import Index from './containers/Index';
import Search from './containers/Search';
import Player from './containers/Player';

render(
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Index} />
      <Route path='/search' component={Search} />
      <Route path='/player/:id' component={Player} />
    </Route>
  </Router>,
  document.getElementById('app')
);
