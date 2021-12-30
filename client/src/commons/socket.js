import SocketIOClient from 'socket.io-client';
const baseURL = process.env.REACT_APP_USER_BASE_URL;

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

let socket = SocketIOClient(baseURL, {
    transports: ['websocket', 'polling', 'flashsocket'],
    withCredentials: true,
    extraHeaders: {
        'my-custom-header': 'abcd',
    },
    query: {
        username: userInfo?.username || userInfo?.email || 'anonymous',
        avatar: userInfo?.avatar,
    },
});

export default socket;
