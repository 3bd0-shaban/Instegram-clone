import React, { useState } from 'react'
import { BsCamera, BsFillChatFill } from 'react-icons/bs'
import { useGetUserPostsQuery } from '../../Redux/APIs/PostsApi';
import { FeatureAction } from './../../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
import { ModalPostDetails } from '../../Components/Exports'
import { ImSpinner3 } from 'react-icons/im';
import { useSelector } from 'react-redux';
const UsersPosts = () => {
    const { data: userPosts, isFeatching, error, isError } = useGetUserPostsQuery() || {};
    const { isModalPostDetails } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    const [postID, setPostID] = useState('');
    const EmptyPosts = () => {
        return (
            <>
                <div className='flex mt-28 justify-center'>
                    <div className='border-black border-[3px] flex items-center rounded-full p-5'>
                        <BsCamera size={40} />
                    </div>
                </div>
                <div className='my-8'>
                    <div className='block text-center space-y-5'>
                        <p className='block font-bold text-4xl'>Share Photos</p>
                        <p>When you share photos, they will appear on your profile.</p>
                        <p className='text-blue-400 font-medium text-base leading-8'>Share your first photo</p>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            {isModalPostDetails && <ModalPostDetails ID={postID} />}
            <div className='container max-w-6xl px-0'>
                {isError && <p>{error?.data?.msg}</p>}
                {isFeatching && <p className='flex justify-center items-center text-3xl font-medium animate-spin'><ImSpinner3 /></p>}
                {(userPosts === [] || !userPosts || userPosts?.length === 0) && <EmptyPosts />}
                <div className='grid grid-cols-3 gap-2 lg:gap-8 mt-7'>
                    {userPosts && userPosts?.map((post) => (
                        <div onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(post?._id) }} key={post?._id} className='h-80 cursor-pointer hover:brightness-50 duration-200 group relative'>
                            <img className='object-cover w-full h-full' src={post?.images[0]?.url} alt='' />
                            <div className='absolute inset-1/2 left-[45%] z-10 gap-3 items-center text-white font-bold hidden group-hover:flex'>
                                <div><BsFillChatFill size={25} /></div>
                                <p className='inline-block'>0</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UsersPosts
