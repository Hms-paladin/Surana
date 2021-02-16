import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Homepage from '../components/DrawerPage/Homepage';
import Login from "../components/Login/index";
import { AuthContext } from "../context/auth";
import PrivateRoute from './PrivateRoute';


function Routes(props) {
    const existingTokens = JSON.parse(localStorage.getItem("token"));
    const [authTokens, setAuthTokens] = useState(existingTokens);
    
    const setTokens = (data) => {
      localStorage.setItem("token", JSON.stringify(data));
      setAuthTokens(data);
    }
  
    return (
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
                <Router basename="surana/?/">
                    <Route exact path={"/"} component={Login} />
                    <PrivateRoute path="/Home" component={Homepage} render={(props)=> <Homepage {...props} />}/>
                </Router>
      </AuthContext.Provider>
    );
  }


export default Routes;
