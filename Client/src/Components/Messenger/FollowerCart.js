import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const FollowerCart = ({ chat, userInfo }) => {
    const [followerchat, setFollowerchat] = useState();
    useEffect(() => {
        const follower = chat?.members?.find(p => p._id !== userInfo?._id);
        setFollowerchat(follower);
    }, [chat, userInfo]);
    return (
        <Link to={`/${followerchat?.username}/message/${chat?._id}`} className='pt-3 p-3 flex hover:bg-gray-100'>
            <img className="p-1 w-20 h-20 rounded-full focus:ring-2 object-cover focus:ring-gray-300"
                src={followerchat?.avatar?.url ? followerchat?.avatar?.url: process.env.REACT_APP_DefaultIcon} alt=""
            />
            <div className='ml-3 my-auto'>
                <p>{followerchat?.username}</p>
                <p className='text-gray-500 text-sm'>{chat?.lastMSG}</p>
            </div>
        </Link>
    )
}

export default FollowerCart
