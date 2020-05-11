import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, AddLocation } from "./container";

import { Provider } from 'react-redux';
import store from './redux/store';

class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/add-location" component={AddLocation} />
            <Route path="/edit-location/:name" component={AddLocation} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
