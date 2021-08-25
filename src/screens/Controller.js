import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import BookShow from "./bookshow/BookShow";
import Confirmation from "./confirmation/Confirmation";
import Details from "./details/Details";
const baseUrl = "http://localhost:8085/api/v1/";

const Controller = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home baseUrl={baseUrl} {...props} />}
          />
          <Route
            path="/bookshow/:id"
            render={(props) => <BookShow baseUrl={baseUrl} {...props} />}
          />
          <Route
            path="/movie/:id"
            render={(props) => <Details baseUrl={baseUrl} {...props} />}
          />
          <Route
            path="/confirm/:id"
            render={(props) => <Confirmation baseUrl={baseUrl} {...props} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default Controller;
