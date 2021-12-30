import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminRoutes from './pages/admin';
import UserRoutes from './pages/user';
import AuthContextProvider from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Switch>
                    <Route path="/admin" component={AdminRoutes} />
                    <Route path="/" component={UserRoutes} />
                </Switch>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
