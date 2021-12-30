import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';
import ActivateAccount from './ActivateAccount';
import Game from './Game';
import ReviewGame from './ReviewGame';
import Home from './Home';
import Login from './Login';
import ForgotPassword from './Login/ForgotPassword';
import ResetPassword from './ResetPassword';
import RoomList from './RoomList';
import SignUp from './SignUp';
import RankList from './RankList';

const UserRoutes = () => {
    const match = useRouteMatch();
    const url = match.url !== '/' ? match.url : '';

    return (
        <Switch>
            <Redirect from="/" exact to="/home" />
            <Route path={`${url}/login`} component={Login} />
            <Route path={`${url}/signup`} component={SignUp} />
            <Route path={`${url}/verify-account/:hashToken`} component={ActivateAccount} />
            <Route path={`${url}/forgot-password`} component={ForgotPassword} />
            <Route path={`${url}/reset-password/:hashToken`} component={ResetPassword} />

            <PrivateRoute path={`${url}/home`} component={Home} />
            <PrivateRoute path={`${url}/room-list`} component={RoomList} />
            <PrivateRoute path={`${url}/room`} component={Game} />
            <PrivateRoute path={`${url}/rank`} component={RankList} />
            <PrivateRoute path={`${url}/board/:boardId`} component={ReviewGame} />
        </Switch>
    );
};

export default UserRoutes;
