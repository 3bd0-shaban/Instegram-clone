import { Header, Chat, FollowerCart, MainNoSelection } from '../../Exports'
import { IoIosArrowDown } from 'react-icons/io'
import { TbMessage2Share } from 'react-icons/tb'
import { useGetUserQuery } from '../../../Redux/APIs/UserApi';
import { useUserChatsQuery } from '../../../Redux/APIs/ChatApi';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
const ListMessaging = () => {
    const { data: userInfo } = useGetUserQuery() || {};
    const { data: Chats } = useUserChatsQuery() || {};
    const [selected, setSelected] = useState(false);
    const { username, id } = useParams();
    useEffect(() => {
        if (id && username) {
            setSelected(true)
        }

    }, [id, username]);

    return (
        <div>
            <Header />
            <div className='container px-0 max-w-[70rem] mt-24 border rounded-md bg-white'>
                <div className='grid grid-cols-3 h-[90vh] '>
                    <div className='col-span-1  border-r mt-5'>
                        <div className='flex border-b pb-2 h-12'>
                            <div className='flex mx-auto text-lg font-semibold'>
                                <p>{userInfo?.username}</p>
                                <div className='mt-2 ml-2'>
                                    <IoIosArrowDown />
                                </div>
                            </div>
                            <div className='ml-auto text-2xl mr-4'>
                                <button><TbMessage2Share /></button>
                            </div>
                        </div>
                        {Chats?.map(chat => (
                            <div key={chat?._id}>
                                <FollowerCart chat={chat} userInfo={userInfo} />
                            </div>
                        ))}
                    </div>
                    <div className='col-span-2 mt-5 relative'>
                        {selected ?
                            <Chat/>
                            :
                            <MainNoSelection />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListMessaging
