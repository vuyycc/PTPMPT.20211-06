import { Switch } from "react-router";
import React, {useState, useEffect, Suspense } from "react";
import {
    BrowserRouter as Router,
    Route, useHistory, useParams
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';

const keyStorage = 'accessToken'
export default function Navigation() {
    const [token, setToken] = useState('')

    const loginSucess = (newToken) => {
        setToken(newToken)
        console.log(newToken)
        localStorage.setItem(keyStorage, newToken)
    }

    useEffect(() => {
        let token = localStorage.getItem(keyStorage)
        setToken(token)
    }, [])
    
    return(
        <Router>
            <Switch>
                <Route path='/signup' component={SignUp} />
                {!token ? <Login exact path='/login' setToken={loginSucess} />  :
                        (<> <Suspense fallback={<h1>Loading...</h1>}>
                        <Route path='/' component={Home} />
                            </Suspense> </>) 
                }
            </Switch>
            
        </Router>
    );
}