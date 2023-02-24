import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaRegSmile } from 'react-icons/fa'
import { IoImageOutline } from 'react-icons/io5'
import { MdOutlineInfo } from 'react-icons/md'
import { useGetUserByIdQuery } from './../../Redux/APIs/UserApi'
import { CoversationCTRL, useSocket, Emoji, InfinteScrollableChat } from './../Exports'
import { useNewMessageMutation } from './../../Redux/APIs/MessageApi'
import { BiChevronLeft } from 'react-icons/bi'
import { motion } from 'framer-motion';
import AnimDropdown from './../../Animation/AnimDropdown'
import { ImSpinner3 } from 'react-icons/im';
import { useSingleChatQuery } from '../../Redux/APIs/ChatApi'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../Redux/Slices/UserSlice'
import { Scrolldown } from '../../Helpers/Scroll'
const ChatBox = () => {
    Scrolldown();
    const { username, id } = useParams();
    const { data: userById } = useGetUserByIdQuery(username) || {};
    const { data: SingleChat } = useSingleChatQuery(id) || {}
    const [MewMessage, { isLoading }] = useNewMessageMutation() || {};
    const [msg, setMSG] = useState('');
    const [image, setImage] = useState();
    const [details, setDetails] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const { socket } = useSocket();
    const userInfo = useSelector(selectCurrentUser);
    const [isPikerVisiable, setIsPikerVisable] = useState(false);
    useEffect(() => {
        socket.on("getusers", (data) => {
            const online = data?.some(user => user.userId === userById?._id)
            online && setIsOnline(true)
        });
    }, [socket, userById, id])

    useEffect(() => {
        socket?.on('TypingtoClient', ({ receiver, status }) => {
            if (SingleChat?.members.includes(receiver)) {
                setIsTyping(status)
            }
        })
        // eslint-disable-next-line 
    }, []);

    const loadFile = (e) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
            };
        }
    };
    const NewMSG = (e) => {
        if (!image) {
            e.preventDefault();
        }
        if (!msg && !image) return;
        const data = { msg, image }
        MewMessage({ data, id }).unwrap()
            .then(payload => {
                setMSG('')
                setImage('')
                setIsPikerVisable(false)
                socket.emit("typing", false);
                socket.emit("Message", {
                    sender: payload.sender,
                    msg: payload.msg,
                    createdAt: payload.createdAt,
                    image: payload.image,
                    receiver: userById?._id
                });
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        if (image) {
            NewMSG()
        }
        // eslint-disable-next-line 
    }, [image]);

    return (
        details ? <CoversationCTRL userById={userById} setDetails={setDetails} details={details} /> :
            <div className='h-full'>
                <div className='fixed lg:static top-0 insetx-0 bg-white w-full flex border-b p-2 lg:px-6 justify-between h-12'>
                    <div className='flex'>
                        <Link to='/messages' className='block lg:hidden'><BiChevronLeft size={30} /></Link>
                        <Link to={userById?.username ? `/${userById?.username}` : ''} className='flex gap-2 items-center'>
                            <img className="p-1 w-10 h-10 rounded-full object-cover focus:ring-2 focus:ring-gray-300"
                                src={userById?.avatar?.url ? userById?.avatar?.url : process.env.REACT_APP_DefaultIcon} alt="" />
                            <div className=''>
                                <p className='my-auto'>{userById?.username ? userById?.username : 'Instegram user'}</p>
                                {isOnline &&
                                    <div className='flex items-center gap-2'>
                                        <span className='w-2 h-2 rounded-full bg-green-600' />
                                        <p className='text-xs text-gray-500'>active now</p>
                                    </div>}
                            </div>
                        </Link>
                    </div>
                    <div className='flex text-3xl gap-4'>
                        <button onClick={() => setDetails(!details)}><MdOutlineInfo /></button>
                    </div>
                </div>
                <div className='pt-3 px-3 overflow-y-scroll hideScrollBare h-[70vh] xsm:h-[82vh] md:h-[88vh] lg:h-[79vh]'>
                    <div>
                        <InfinteScrollableChat userById={userById} id={id} />

                        {isTyping && <p className='mx-3'>typing ....</p>}
                        {image &&
                            <div className='flex justify-end'>
                                <div className='max-w-[10rem] md:max-w-[15rem] relative'>
                                    <img src={image} accept="image/*" alt='' className='rounded-xl w-full flex justify-end' />
                                    {isLoading && <div className='absolute inset-0 bg-white/50 flex justify-center items-center text-gray-500'>
                                        <span className=' animate-spin'> <ImSpinner3 size={30} /></span>
                                    </div>}
                                </div>
                            </div>}

                        <form
                            onSubmit={NewMSG}
                            className='fixed lg:absolute inset-x-0 bottom-4 mx-2 border rounded-full w-[97%] mb-2 py-3 lg:by-5 px-6 flex items-center mt-auto '
                        >

                            <>
                                <div className='text-2xl relative'>
                                    <button type='button' onClick={() => setIsPikerVisable(!isPikerVisiable)}>
                                        <FaRegSmile />
                                    </button>
                                    {isPikerVisiable &&
                                        <motion.div
                                            variants={AnimDropdown}
                                            initial='initial'
                                            animate='animated'
                                            exit='exit'
                                            className='absolute z-10 bottom-12 -left-5'>
                                            <Emoji
                                                setComment={setMSG}
                                                comment={msg} />
                                        </motion.div>
                                    }
                                </div>
                                <input
                                    className='outline-none bg-transparent w-full mx-4'
                                    onChange={(e) => {
                                        setMSG(e.target.value); socket.emit("typing",
                                            {
                                                receiver: userById._id, sender: userInfo._id, status: true
                                            })
                                    }}
                                    onFocus={() => setIsPikerVisable(false)}
                                    onBlur={() => socket.emit("typing", { receiver: userById._id, sender: userInfo._id, status: false })}
                                    value={msg}
                                    autoComplete='off'
                                    placeholder='Message ...' />
                                {msg ?
                                    <button type='submit' className='text-blue-500 font-semibold'>Send</button>
                                    :
                                    <div className='ml-auto flex text-2xl gap-4'>
                                        <label onChange={loadFile} className='cursor-pointer'>
                                            <input type='file' className='hidden' />
                                            <IoImageOutline />
                                        </label>
                                        {/* <button onClick={()=>setIsHeart(true)}></button> */}
                                    </div>
                                }
                            </>
                            {!userById?.username && <p className='w-full text-center'>Not accessed</p>}
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default ChatBox
