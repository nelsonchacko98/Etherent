import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Client from "./Client";
export class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Switch>
        {/* <Route path="/" component={LandingPage} exact/> */}
        <Route path="/Date" component={Date} />
        <Route path="/Client" component={Client} />
      </Switch>
    );
  }
}

export default Main;
