import React from 'react';
import { Admin, fetchUtils, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import UserList from './UserList';
import UserEdit from './UserEdit';
import UserShow from './UserShow';
import BoardList from './BoardList';
import BoardShow from './BoardShow';
import { GamepadRounded, GroupRounded } from '@material-ui/icons';
import { axiosAdmin } from '../../../api/axiosAdmin';
import HomePage from './HomePage';

const authProvider = {
    login: async ({ username, password }) => {
        try {
            const res = await axiosAdmin.post('/auth/login', { username, password });
            localStorage.setItem('adminToken', res.data.token);
            localStorage.setItem('adminInfo', JSON.stringify(res.data.adminInfo));

            return Promise.resolve();
        } catch (error) {
            throw new Error('Username or password is incorrect!');
        }
    },
    logout: () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        return Promise.resolve();
    },
    checkError: (error) => {
        if (error.status === 401 || error.status === 403) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminInfo');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('adminToken') ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getIdentity: () => {
        try {
            if (localStorage.getItem('adminInfo')) {
                const { userId: id, username: fullName, avatar } = JSON.parse(
                    localStorage.getItem('adminInfo'),
                );
                return Promise.resolve({ id, fullName, avatar });
            }
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('adminToken');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

const DashBoard = () => {
    return (
        <Admin
            dataProvider={restProvider(process.env.REACT_APP_ADMIN_MANAGE_BASE_URL, httpClient)}
            authProvider={authProvider}
            dashboard={HomePage}
        >
            <Resource
                name="users"
                show={UserShow}
                list={UserList}
                edit={UserEdit}
                icon={GroupRounded}
            />
            <Resource name="boards" show={BoardShow} list={BoardList} icon={GamepadRounded} />
        </Admin>
    );
};

export default DashBoard;
