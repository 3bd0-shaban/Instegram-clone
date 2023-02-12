import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './../Redux/Slices/UserSlice';
import jwtDecode from 'jwt-decode';
const url = process.env.REACT_APP_API_KEY;
const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(io(url));
    const token = useSelector(selectCurrentToken);
    useEffect(() => {
        if (token) {
            const { id } = jwtDecode(token)
            if (id) {
                socket.on("connect", () => {
                    socket.emit("join", id);
                    console.log('Goined !')
                });
            }
            return
        }
        return () => {
            socket.off('connect');
        };
    }, [token, socket]);

    return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

export default SocketContext;
