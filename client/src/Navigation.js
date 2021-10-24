import React, {useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route, useHistory, useParams
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Sign_in_up/Login';
import SignUp from './components/Sign_in_up/SignUp';

export default function Navigation() {
    return(
        <Router>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
        </Router>
    );
}