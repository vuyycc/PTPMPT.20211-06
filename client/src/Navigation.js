import { Switch } from "react-router";
import selecUser from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import React, {useState, useEffect, Suspense } from "react";
import {
    BrowserRouter as Router,
    Route, useHistory, useParams
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Roomlist from './components/Roomlist/room-list';


export default function Navigation() {
    const userInfo = localStorage.getItem('user');
    const [user, setUser] = useState(JSON.parse(userInfo));

    const loginSuccess = (user) => {
       localStorage.setItem('user',JSON.stringify(user));
        setUser(user);
    }

    
    return(
        <Router>
            <Switch>             
                <Route exact path='/login' >
                    <Login setToken={loginSuccess} authorized={user}  />
                </Route>
                <Route exact path='/signup' >
                    <SignUp authorized={user}/>
                </Route>
                <Route exact path='/'>
                    <Home authorized={user}/>
                </Route>
                <Route exact path='/roomlist' >
                    <Roomlist authorized={user} />
                </Route>
            </Switch>
            
        </Router>
    );
}