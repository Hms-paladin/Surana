import React, { Component } from 'react';
import HeaderComp from './DrawerPage';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        };
    }
    componentWillMount() {

        // if (localStorage['LoginStatus'] != 'true') { this.props.history.push('/'); }

        // this.unlisten = this.props.history.listen((location, action) => {
        //     var loggedin = localStorage['LoginStatus'] == 'true';

        //     if (loggedin) {

        //     } else {

        //         this.unlisten();
        //         this.props.history.push('/');

        //     }

        // });
    }
    render() {
        return (
            <div>
                <HeaderComp {...this.props} />
            </div>
        );
    }


}
export default Homepage;