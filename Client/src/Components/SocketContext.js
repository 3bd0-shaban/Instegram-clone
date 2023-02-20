import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const url = process.env.REACT_APP_API_KEY;
const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {

    const [socket, setSocket] = useState(io(url));

    const userId = localStorage.getItem('id')
    useEffect(() => {
        if (userId) {
            socket.on("connect", () => {
                socket.emit("join", userId);
            });
            // socket.on("getusers", (data) => {
            //     // console.log(data)
            // });
        }
    }, [userId, socket]);

    return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};
export default SocketContext;
