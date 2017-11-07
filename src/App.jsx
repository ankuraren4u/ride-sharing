import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
import Home from './containers/Home'
import Signup from './containers/Signup'
import PickRide from './containers/PickRide'

const newHistory = createBrowserHistory();

const App = () => (
  <Router history={newHistory}>
  	<Switch>
    	<Route exact path="/" component={Home} />
    	<Route path="/signup" component={Signup} />
    	<Route path="/pick-ride" component={PickRide} />
    </Switch>
  </Router>
)

export default App;
