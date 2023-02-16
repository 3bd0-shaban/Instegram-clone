import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"
import { io } from "socket.io-client";
import { selectCurrentUser } from './../Redux/Slices/UserSlice';

const SocketConnect = () => {
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
    <Outlet />
  )
}

export default SocketConnect
