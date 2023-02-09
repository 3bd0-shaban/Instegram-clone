import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useGetUserQuery } from '../Redux/APIs/UserApi';
const url = process.env.REACT_APP_API_KEY;

const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(io(url));
    const { data: userInfo } = useGetUserQuery()
    const userid = userInfo?._id
    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('join', userid);
        });
    }, [userid, socket]);

    return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
