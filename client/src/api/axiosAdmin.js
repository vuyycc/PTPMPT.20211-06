import axios from 'axios';

export const axiosAdmin = axios.create({
    baseURL: process.env.REACT_APP_ADMIN_BASE_URL,
});

axiosAdmin.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            request.headers['Authorization'] = 'Bearer ' + token;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error.response);
    },
);

axiosAdmin.interceptors.response.use(
    (response) => {
        if (response.data) {
            return response.data;
        }
    },
    (error) => {
        return Promise.reject(error.response);
    },
);
