import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from '../components/DrawerPage/Homepage';

export default class Routes extends Component {
    render() {
        return (
            <Router basename="surana/?/">
                <Route path="/Home" component={Homepage} render={(props)=> <Homepage {...props} />}/>
            </Router>
        );
    }
}
