import React from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import { TbMessage2Share } from 'react-icons/tb';
import FollowerCart from './FollowerCart';

const SideBarChats = ({ userInfo, Chats }) => {
    return (
        <>
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
        </>
    )
}

export default SideBarChats
