import { SideBar, Chat, SideBarChats, MainNoSelection } from '../../Exports'
import { useUserChatsQuery } from '../../../Redux/APIs/ChatApi';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { io } from 'socket.io-client'
import useBreakpoint from './../../../Hooks/useBreakpoint';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../Redux/Slices/UserSlice';
// const url = process.env.REACT_APP_API_KEY;
const MessengerWindow = () => {
    const userInfo = useSelector(selectCurrentUser)
    const { data: Chats } = useUserChatsQuery() || {};
    const [selected, setSelected] = useState(false);
    // const socket = useRef()
    const { username, id } = useParams();
    const breakpoint = useBreakpoint();

    const MobileView = (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg');
    const lapview = (breakpoint === 'xxxl' || breakpoint === 'xxl' || breakpoint === 'xl');

    const HideChatsMobile = (!username && !id && MobileView)
    useEffect(() => {
        if (id && username) {
            setSelected(true)
        }
    }, [id, username]);
    // useEffect(() => {
    //     socket.current = io(url);
    //     // socket.current.on("getMessage", (data) => {
    //     // });
    // }, []);
    // useEffect(() => {
    //     socket.current.emit("joinUser", userInfo?._id)
    //     socket.current.on("getUsers", users => {
    //         console.log(users)
    //     })
    // }, [userInfo]);
    return (
        <div className='h-screen flex lg:items-center bg-white overflow-hidden'>
            <SideBar />
            <div className='container px-0 max-w-[70rem] border rounded-md bg-white xl:mr-48 xxxl:mr-[26rem]'>
                <div className='grid grid-cols-3 h-[95vh]'>
                    {lapview &&
                        <div className='col-span-3 lg:col-span-1 border-r mt-5 overflow-y-scroll hideScrollBare'>
                            <SideBarChats Chats={Chats} userInfo={userInfo} />
                        </div>
                    }
                    {HideChatsMobile &&
                        <div className='col-span-3 lg:col-span-1 border-r mt-5 overflow-y-scroll hideScrollBare'>
                            <SideBarChats Chats={Chats} userInfo={userInfo} />
                        </div>
                    }
                    <div className={`col-span-2 mt-2 relative ${MobileView && '!col-span-3'}`}>
                        {selected ?
                            <Chat />
                            :
                            <MainNoSelection />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessengerWindow
