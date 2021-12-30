import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminDashBoard from './DashBoard';
const AdminRoutes = () => {
    const match = useRouteMatch();
    const url = match.url !== '/' ? match.url : '';

    return (
        <Switch>
            <Route path={`${url}`} component={AdminDashBoard} />
        </Switch>
    );
};

export default AdminRoutes;
