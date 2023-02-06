import { SideBar, Chat, SideBarChats, MainNoSelection } from '../../Exports'
import { useGetUserQuery } from '../../../Redux/APIs/UserApi';
import { useUserChatsQuery } from '../../../Redux/APIs/ChatApi';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useBreakpoint from './../../../Hooks/useBreakpoint';
const MessengerWindow = () => {
    const { data: userInfo } = useGetUserQuery() || {};
    const { data: Chats } = useUserChatsQuery() || {};
    const [selected, setSelected] = useState(false);
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

    return (
        <div className='h-screen flex items-center bg-white overflow-hidden'>
            <SideBar />
            <div className='container px-0 max-w-[70rem] border rounded-md bg-white xl:mr-48 xxxl:mr-[26rem]'>
                <div className='grid grid-cols-3 h-[90vh]'>
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
                    <div className={`col-span-2 mt-5 relative ${MobileView && '!col-span-3'}`}>
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
