import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import Layout from '../Layout';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { authData } = useAuthContext();
    return (
        <Route
            {...rest}
            render={(props) =>
                Object.keys(authData).length !== 0 ? (
                    <Layout {...props}>
                        <Component />
                    </Layout>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
