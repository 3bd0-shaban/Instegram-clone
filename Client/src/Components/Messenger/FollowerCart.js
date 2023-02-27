import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './../../Redux/Slices/UserSlice';

const FollowerCart = ({ chat, username }) => {
    const [followerchat, setFollowerchat] = useState();
    const userInfo = useSelector(selectCurrentUser)
    useEffect(() => {
        const follower = chat?.members?.find(p => p._id !== userInfo?._id);
        setFollowerchat(follower);
        // eslint-disable-next-line 
    }, []);
    return (
        <Link to={`/${followerchat?.username}/message/${chat?._id}`} className={`pt-3 p-3 flex hover:bg-gray-50 relative ${(username === followerchat?.username) && '!bg-gray-100'}`}>
            <img className="p-1 w-20 h-20 rounded-full focus:ring-2 object-cover focus:ring-gray-300"
                src={followerchat?.avatar?.url ? followerchat?.avatar?.url : process.env.REACT_APP_DefaultIcon} alt=""
            ></img>
            <div className='ml-3 my-auto'>
                <p>{followerchat?.username}</p>
                <p className='text-gray-500 text-sm'>{chat?.lastMSG}</p>
            </div>
            {chat.isOnline &&
                <span className='w-2.5 h-2.5 rounded-full bg-green-600/90 absolute bottom-5 left-[23%]' />}
        </Link>
    )
}

export default FollowerCart
