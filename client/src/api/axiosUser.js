import axios from 'axios';

export const axiosUser = axios.create({
    baseURL: process.env.REACT_APP_USER_BASE_URL,
});

axiosUser.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('token');
        if (token) {
            request.headers['Authorization'] = 'Bearer ' + token;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error.response);
    },
);

axiosUser.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
    },
    (error) => {
        return Promise.reject(error.response);
    },
);
