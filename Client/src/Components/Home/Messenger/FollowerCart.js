import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const FollowerCart = ({ chat, userInfo }) => {
    const [followerchat, setFollowerchat] = useState();
    useEffect(() => {
        const follower = chat?.members?.find(p => p._id !== userInfo?._id);
        setFollowerchat(follower);
    }, [chat, userInfo]);
    return (
        <Link to={`/${followerchat?.username}/message/${followerchat?._id}`} className='pt-3 p-3 flex hover:bg-gray-100'>
            <img className="p-1 w-20 h-20 rounded-full focus:ring-2 focus:ring-gray-300"
                src={followerchat?.avatar?.url} alt=""
            />
            <div className='ml-3 my-auto'>
                <p>{followerchat?.username}</p>
                <p className='text-gray-500 text-sm'>Active Yesterday</p>
            </div>
        </Link>
    )
}

export default FollowerCart
