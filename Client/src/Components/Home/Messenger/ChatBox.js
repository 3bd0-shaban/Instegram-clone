import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaRegSmile } from 'react-icons/fa'
import { IoImageOutline } from 'react-icons/io5'
import { MdOutlineInfo } from 'react-icons/md'
import { HiOutlineHeart } from 'react-icons/hi'
import { useGetUserByIdQuery } from '../../../Redux/APIs/UserApi'
import { Message } from '../../Exports'
import { useGetMessagesQuery, useNewMessageMutation } from '../../../Redux/APIs/MessageApi'
import { BiChevronLeft } from 'react-icons/bi'
import { SocketContext } from '../../Exports'
const ChatBox = ({ setSelected }) => {
    const { username, id } = useParams();
    const { data: userInfo } = useGetUserByIdQuery(username) || {};
    const { data: FollowerMessages } = useGetMessagesQuery(id) || {};
    const [recievedmsg, setRecieved] = useState({});
    const [allMSGs, setAllMSGs] = useState([]);
    const [MewMessage] = useNewMessageMutation() || {};
    const [msg, setMSG] = useState('');
    const ScrollRef = useRef();
    const { socket } = useContext(SocketContext)
    useEffect(() => {
        ScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [allMSGs]);

    useEffect(() => {
        setAllMSGs(FollowerMessages);
        socket.on('MessagetoClient', (data) => {
            console.log(data)
            setRecieved({
                data
            });
            console.log(recievedmsg)
        })
        // eslint-disable-next-line 
    }, [socket, FollowerMessages]);
    // useEffect(() => {
    //     recievedmsg &&
    //         setAllMSGs([...allMSGs, recievedmsg]);
    //     console.log(recievedmsg)
    // }, [recievedmsg]);
    const NewMSG = (e) => {
        e.preventDefault();
        const data = { msg }
        MewMessage({ data, id }).unwrap()
            .then(payload => {
                // console.log(payload)
                // setAllMSGs([...allMSGs, payload]);

                socket.emit("Message", { payload, receiverId: userInfo?._id });
                setMSG('')
            })
            .catch(err => console.log(err))
    }
    // console.log({ allMSGs })
    return (
        <div>
            <>
                <div className='flex border-b pb-2 px-2 lg:px-6 justify-between h-12'>
                    <div className='flex gap-2 items-center'>
                        <Link to='/messages' className='block lg:hidden'><BiChevronLeft size={30} /></Link>
                        <img className="p-1 w-10 h-10 rounded-full focus:ring-2 focus:ring-gray-300" src={userInfo?.avatar?.url} alt="" />
                        <p className='my-auto'>{userInfo?.username}</p>
                    </div>
                    <div className='flex text-3xl gap-4'>
                        {/* <Link to='/call'><BsTelephone /></Link>
                        <Link to='/call'><VscDeviceCameraVideo /></Link> */}
                        <Link to='/call'><MdOutlineInfo /></Link>
                    </div>
                </div>
                <div className='pt-3 p-3 overflow-y-scroll hideScrollBare h-[75vh]'>
                    <div>
                        {allMSGs?.map(message => (
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

        </div>
    )
}

export default ChatBox
