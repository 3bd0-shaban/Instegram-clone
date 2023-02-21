import { io } from 'socket.io-client';
import { createContext, useContext, useEffect, useRef } from 'react';
const url = process.env.REACT_APP_API_KEY;
const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {

    const socket = useRef(io(url));

    const userId = localStorage.getItem('id')
    useEffect(() => {
        if (userId) {
            socket.current.on("connect", () => {
                socket.current.emit("join", userId);
            });
            // socket.on("getusers", (data) => {
            //     // console.log(data)
            // });
        }
    }, [userId, socket]);

    return <SocketContext.Provider value={{ socket: socket.current }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};
export default SocketContext;
