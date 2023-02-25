import { SideBar, ChatBox, SideBarChats, MainNoSelection } from './../Exports'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useBreakpoint from './../../Hooks/useBreakpoint';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './../../Redux/Slices/UserSlice';
const MessengerWindow = () => {
    const userInfo = useSelector(selectCurrentUser)
    const [selected, setSelected] = useState(false);
    const { username, id } = useParams();
    const breakpoint = useBreakpoint();

    const MobileView = (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg');
    const lapview = (breakpoint === 'xxxl' || breakpoint === 'xxl' || breakpoint === 'xl');
    
    useEffect(() => {
        if (id && username) {
            setSelected(true)
        }
    }, [id, username]);

    return (
        <div className='h-screen flex lg:items-center bg-white overflow-hidden'>
            <SideBar />
            <div className='container px-0 max-w-full lg:max-w-[60rem] xxxl:max-w-[70rem] border rounded-md bg-white'>
                <div className='grid grid-cols-3 h-screen'>
                    {(lapview || (!username && !id && MobileView)) &&
                        <div className='col-span-3 lg:col-span-1 border-r h-full'>
                            <SideBarChats userInfo={userInfo} />
                        </div>
                    }
                    <div className={`col-span-2 relative ${MobileView && '!col-span-3'}`}>
                        {selected ?
                            <ChatBox />
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
