import React from 'react'
import { IoIosArrowDown } from 'react-icons/io';
// import { TbMessage2Share } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import FollowerCart from './FollowerCart';

const SideBarChats = ({ userInfo, Chats }) => {
    return (
        <>
            <div className='flex border-b py-2'>
                <div className='flex mx-auto text-lg font-semibold'>
                    <Link to={`/${userInfo?.username}`}>
                        <p>{userInfo?.username}</p>
                    </Link>
                    <div className='mt-2 ml-2'>
                        <IoIosArrowDown />
                    </div>
                </div>
                <div className='ml-auto text-2xl mr-4'>
                    {/* <button><TbMessage2Share /></button> */}
                </div>
            </div>
            {Chats?.map(chat => (
                <div key={chat?._id}>
                    <FollowerCart chat={chat} userInfo={userInfo} />
                </div>
            ))}
        </>
    )
}

export default SideBarChats
