import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import {Switch} from "react-router-dom";
import {Route } from "react-router-dom";
import Home from './home/Home';
import BookShow from './bookshow/BookShow';
import Confirmation from './confirmation/Confirmation';
import Details from "./details/Details";

const Controller = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" render={(props) => <Home {...props} />} />
                    <Route path="/bookshow/:id" render={(props) => <BookShow {...props} />} />
                    <Route path="/movie/:id" render={(props) => <Details {...props} />} />
                    <Route path="/confirm/:id" render={(props) => <Confirmation {...props} />} />
                </Switch>
            </div>
        </Router>
    )
};


export default Controller;