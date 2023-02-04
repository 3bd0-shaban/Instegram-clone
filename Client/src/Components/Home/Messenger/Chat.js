import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BsTelephone } from 'react-icons/bs'
import { VscDeviceCameraVideo } from 'react-icons/vsc'
import { FaRegSmile } from 'react-icons/fa'
import { IoImageOutline } from 'react-icons/io5'
import { MdOutlineInfo } from 'react-icons/md'
import { HiOutlineHeart } from 'react-icons/hi'
import { useGetUserByIdQuery } from '../../../Redux/APIs/UserApi'
import { useNewChatMutation } from '../../../Redux/APIs/ChatApi'
import { IoMdPaperPlane } from 'react-icons/io'
import { Message } from '../../Exports'
import { useGetMessagesQuery, useNewMessageMutation } from '../../../Redux/APIs/MessageApi'
const Chat = () => {
    const { username, id } = useParams();
    const { data: userInfo } = useGetUserByIdQuery(username) || {};
    const { data: FollowerMessages } = useGetMessagesQuery(id) || {};
    const [NewChat] = useNewChatMutation() || {};
    const [MewMessage, mutationResult] = useNewMessageMutation() || {};
    const [msg, setMSG] = useState();
    const ScrollRef = useRef();
    useEffect(() => {
        ScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [FollowerMessages]);

    // useEffect(() => {
    //     NewChat(id).unwrap()
    //         // .then(payload =>return)
    //         .catch(err => console.log(err))
    // }, [NewChat, id]);
    const NewMSG = (e) => {
        e.preventDefault();
        const data = { msg }
        MewMessage({ data, id }).unwrap()
            .then(payload => setMSG(''))
            .catch(err => console.log(err))
    }
    console.log(mutationResult);
    const MainNoChat = () => {
        return (
            <div>
                <div className='flex mt-28 justify-center items-center h-[60vh] '>
                    <div className='border-black border-[3px] flex items-center rounded-full p-7'>
                        <IoMdPaperPlane size={60} />
                    </div>
                </div>
                <div className='my-8'>
                    <div className='block text-center space-y-5'>
                        <p className='block font-bold text-4xl'>Your Messages</p>
                        <p>Send private photos and messages to a friend or group.</p>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div>
            {id ? <>
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
                <div className='pt-3 p-3 overflow-y-scroll hideScrollBare h-[75vh]'>
                    <div>
                        {FollowerMessages?.map(message => (
                            <div ref={ScrollRef} key={message?._id}>
                                <Message message={message} FollowerChating={message?.sender === userInfo?._id} />
                            </div>
                        ))}
                        <form onSubmit={NewMSG} className='border rounded-full w-[97%] mb-5 py-5 px-6 flex items-end mt-auto absolute bottom-0'>
                            <div className='text-2xl'><FaRegSmile /></div>
                            <input
                                className='outline-none bg-transparent w-full mx-4'
                                onChange={(e) => setMSG(e.target.value)}
                                value={msg}
                                name='msg'
                                autoComplete='off'
                                placeholder='Message ...' />
                            {msg ?
                                <button className='text-blue-500 font-semibold'>Send</button>
                                :
                                <div className='ml-auto flex text-2xl gap-4'>
                                    <IoImageOutline />
                                    <HiOutlineHeart />
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </>
                :
                <MainNoChat />
            }
        </div>
    )
}

export default Chat
