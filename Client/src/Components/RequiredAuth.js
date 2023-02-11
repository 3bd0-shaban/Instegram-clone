import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { io } from "socket.io-client";
import { useAuth } from '../Components/Exports';
import { selectCurrentUser } from './../Redux/Slices/UserSlice';
const RequireAuth = ({ allowedRoles }) => {
    const { roles } = useAuth();
    const location = useLocation();
    const url = process.env.REACT_APP_API_KEY;

    const [socket, setSocket] = useState(io(url));
    const user = useSelector(selectCurrentUser);
    const userId = user?._id
    useEffect(() => {
        if (userId) {
            socket.on("connect", () => {
                socket.emit("join", userId);
                console.log('Goined !')
            });
            socket.on("getusers", (data) => {
                console.log(data)
            });
            setSocket(socket)
        }
        return
    }, [userId, socket]);


    return (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to="/signin" state={{ from: location }} replace />
    )
}
export default RequireAuth