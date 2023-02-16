import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaRegSmile } from 'react-icons/fa'
import { IoImageOutline } from 'react-icons/io5'
import { MdOutlineInfo } from 'react-icons/md'
import { HiOutlineHeart } from 'react-icons/hi'
import { useGetUserByIdQuery } from '../../../Redux/APIs/UserApi'
import { Message, CoversationCTRL } from '../../Exports'
import { useGetMessagesQuery, useNewMessageMutation } from '../../../Redux/APIs/MessageApi'
import { BiChevronLeft } from 'react-icons/bi'
import { useSocket } from '../../Exports'
const ChatBox = ({ setSelected }) => {
    const { username, id } = useParams();
    const { data: userById } = useGetUserByIdQuery(username) || {};
    const { data: FollowerMessages } = useGetMessagesQuery(id) || {};
    const [recievedmsg, setRecieved] = useState({});
    const [allMSGs, setAllMSGs] = useState([]);
    const [MewMessage] = useNewMessageMutation() || {};
    const [msg, setMSG] = useState('');
    const [details, setDetails] = useState();
    const ScrollRef = useRef();
    const { socket } = useSocket();
    useEffect(() => {
        ScrollRef.current?.scrollIntoView({ behavior: 'smooth' })
        ScrollRef.current?.focus();
    }, [allMSGs]);

    useEffect(() => {
        setAllMSGs(FollowerMessages);
        socket?.on('MessagetoClient', ({ sender, receiver, createdAt, msg }) => {
            console.log({ sender, receiver, createdAt, msg });
            setRecieved({
                sender, receiver, createdAt, msg
            });
        })
        // eslint-disable-next-line 
    }, [socket, FollowerMessages]);

    useEffect(() => {
        recievedmsg &&
            setAllMSGs([...allMSGs, recievedmsg]);
        // eslint-disable-next-line 
    }, [recievedmsg, setAllMSGs]);

    const NewMSG = (e) => {
        e.preventDefault();
        const data = { msg }
        MewMessage({ data, id }).unwrap()
            .then(payload => {
                setAllMSGs([...allMSGs, payload]);
                socket.emit("Message", {
                    sender: payload.sender,
                    msg: payload.msg,
                    createdAt: payload.createdAt,
                    receiver: userById?._id
                });
                setMSG('')
            })
            .catch(err => console.log(err))
    }
    return (
        details ? <CoversationCTRL userById={userById} setDetails={setDetails} details={details} /> :
            <>
                <div className='flex border-b pb-2 px-2 lg:px-6 justify-between h-12'>
                    <div className='flex'>
                        <Link to='/messages' className='block lg:hidden'><BiChevronLeft size={30} /></Link>
                        <Link to={userById?.username ? `/${userById?.username}` : ''} className='flex gap-2 lg:items-center'>
                            <img className="p-1 w-10 h-10 rounded-full object-cover focus:ring-2 focus:ring-gray-300" src={userById?.avatar?.url || 'https://res.cloudinary.com/abdo9/image/upload/v1676052171/profile_bikmhe.jpg'} alt="" />
                            <p className='my-auto'>{userById?.username || 'Instegram user'}</p>
                        </Link>
                    </div>
                    <div className='flex text-3xl gap-4'>
                        {/* <Link to='/call'><BsTelephone /></Link>
                        <Link to='/call'><VscDeviceCameraVideo /></Link> */}
                        <button onClick={() => setDetails(!details)}><MdOutlineInfo /></button>
                    </div>
                </div>
                <div className='pt-3 p-3 overflow-y-scroll hideScrollBare h-[75vh]'>
                    <div>
                        {allMSGs?.map((message, index) => (
                            <div ref={ScrollRef} key={index}>
                                <Message message={message} FollowerChating={message?.sender === userById?._id} />
                            </div>
                        ))}
                        <form onSubmit={NewMSG} className='border rounded-full w-[97%] mb-5 py-5 px-6 flex items-end mt-auto absolute bottom-0'>
                            {!userById?.username ? <p className='w-full text-center'>Not accessed</p> :
                                <>
                                    <div className='text-2xl'><FaRegSmile /></div>
                                    <input
                                        className='outline-none bg-transparent w-full mx-4'
                                        onChange={(e) => setMSG(e.target.value)}
                                        value={msg}
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
                                </>
                            }
                        </form>
                    </div>
                </div>
            </>
    )
}

export default ChatBox
