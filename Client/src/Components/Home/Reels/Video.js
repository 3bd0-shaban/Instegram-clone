import React, { useEffect, useRef, useState } from 'react'
import { BsCamera, BsChat, BsHeart, BsThreeDotsVertical } from 'react-icons/bs'
import { IoMdPaperPlane } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useIntersection } from '../../Exports';

const Video = ({ Reel }) => {

    const { elementRef, isInViewPort } = useIntersection();

    const videoRef = useRef();
    const [play, setPlay] = useState(false);

    useEffect(() => {
        if (isInViewPort) {
            videoRef.current.play();
            console.log(`${Reel?._id} In View`)
        } else {
            console.log(`${Reel?._id} not in`)
            if (videoRef.current.play) {
                videoRef.current.pause();
            }
        }
    }, [isInViewPort, Reel]);

    const handleVideo = () => {
        setPlay(!play);
        if (play === true) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    };
    return (
        <div className='h-full' onClick={handleVideo}>
            <video ref={videoRef} className='h-full object-cover relative' autoPlay loop playsInline>
                <source src={Reel?.videos[0]?.url} />
            </video>
            <span className='absolute top-0 font-medium text-xl p-5 uppercase font-poppins flex justify-between w-full'>
                <p>Reels</p>
                <p><BsCamera size={25} /></p>
            </span>
            <div  ref={elementRef}  className='w-full px-5 absolute bottom-5'>
                <div className='flex justify-between items-end'>
                    <div className='space-y-2'>
                        <Link to={`/${Reel?.user?.username}`} className='flex items-center'>
                            <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300"
                                src={Reel?.user?.avatar?.url ? Reel?.user?.avatar?.url : process.env.REACT_APP_DefaultIcon}
                                alt=""
                            />
                            <div className='ml-2 mt-2 flex gap-3'>
                                <span className='text-md font-poppins font-medium'>{Reel?.user?.username}</span>
                                <button className='font-then text-sm border px-3 py-1.5 rounded-lg'>Following</button>
                            </div>
                        </Link>
                        <p>{Reel?.des}</p>
                    </div>
                    <div className='z-10'>
                        <div className='mx-auto space-y-5 flex-col justify-center items-center'>
                            <button ><BsHeart size={25} /></button>
                            <BsChat size={25} />
                            <IoMdPaperPlane size={25} />
                            <BsThreeDotsVertical size={25} />
                            <div className='w-10 h-10 rounded-md border-2 overflow-hidden'>
                                <img className="object-cover focus:ring-2 focus:ring-gray-300"
                                    src={Reel?.user?.avatar?.url ? Reel?.user?.avatar?.url : process.env.REACT_APP_DefaultIcon}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video
