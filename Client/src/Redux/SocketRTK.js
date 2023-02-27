import { io } from 'socket.io-client';

const url = process.env.REACT_APP_API_KEY
let socket;
const getSocket = () => {
    if (!socket) {
        socket = io(url, {
            withCredentials: true
        });
    }
    return socket
}

export default getSocket