import React from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { BsTelephone } from 'react-icons/bs'
import { VscDeviceCameraVideo } from 'react-icons/vsc'
import { FaRegSmile } from 'react-icons/fa'
import { IoImageOutline } from 'react-icons/io5'
import { MdOutlineInfo } from 'react-icons/md'
import { HiOutlineHeart } from 'react-icons/hi'
import { useGetUserByIdQuery } from '../../Redux/APIs/UserApi'
const Chat = () => {
    // const [searchQuery] = useSearchParams();
    // const username = searchQuery.getAll();
    const { username, id } = useParams();

    const { data: userInfo } = useGetUserByIdQuery(username) || {};

    return (
        <div>
            <div className='flex border-b pb-2 px-6 justify-between h-12'>
                <div className='flex'>
                    <img className="p-1 w-10 h-10 rounded-full focus:ring-2 focus:ring-gray-300" src="/Images/profile.jpg" alt="" />
                    <p className='ml-2 my-auto'>{userInfo?.username}</p>
                </div>
                <div className='flex text-3xl gap-4'>
                    <Link to='/call'><BsTelephone /></Link>
                    <Link to='/call'><VscDeviceCameraVideo /></Link>
                    <Link to='/call'><MdOutlineInfo /></Link>
                </div>
            </div>
            <div className='pt-3 p-3 '>
                <div>
                    <div className='flex justify-start '>
                        <div className='border h-10 rounded-3xl flex items-center px-5 py-8'>
                            <p>Hello man ! what's up</p>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <div className='border h-10 rounded-3xl items-center px-5 py-8 mt-3 flex justify-end bg-gray-200 '>
                            <p>Hello man ! what's up</p>
                        </div>
                    </div>
                    <div className='border rounded-full w-[97%] mb-5 py-5 px-6 flex items-end mt-auto absolute bottom-0'>
                        <div className='text-2xl'><FaRegSmile /></div>
                        <input className='outline-none bg-transparent w-full mx-4' placeholder='Message ...' />
                        <div className='ml-auto flex text-2xl gap-4'>
                            <IoImageOutline />
                            <HiOutlineHeart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat
