import React, { useState } from 'react'
import { BsCamera, BsFillChatFill } from 'react-icons/bs'
import { useGetUserPostsByIdQuery } from '../../../Redux/APIs/PostsApi';
import { ImSpinner3 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { ModalPostDetails, useBreakpoint } from '../../Exports';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const UsersPostsById = ({ ID, userInfo }) => {
    const { data: userPostsById, isFetching, error, isError } = useGetUserPostsByIdQuery(ID) || {};
    const { isModalPostDetails } = useSelector(state => state.Features);
    const [postID, setPostID] = useState('');
    const dispatch = useDispatch();
    const breakpoint = useBreakpoint();
    const MobileView = (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg');
    const navigate = useNavigate();
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
        <div className='container max-w-5xl px-0'>
            <AnimatePresence>
                {isModalPostDetails && <ModalPostDetails ID={postID} />}
            </AnimatePresence>
            {isError && <p>{error?.data?.msg}</p>}
            {isFetching ? <p className='flex justify-center h-96 items-center text-5xl text-gray-600 font-medium animate-spin'><ImSpinner3 /></p> :
                <div className='grid grid-cols-3 gap-2 lg:gap-8 mt-7'>
                    {userPostsById && userPostsById?.map((post) => (
                        <div onClick={
                            () => {
                                MobileView ? navigate(`/p/${post?._id}?profile=${userInfo.username}`)
                                    :
                                    dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(post?._id)
                            }} key={post._id}
                            className='h-40 md:h-80 cursor-pointer hover:brightness-50 duration-200 group relative'>
                            <img className='object-cover w-full h-full' src={post?.images[0]?.url} alt='' />
                            <div className='absolute inset-1/2 left-[45%] z-10 gap-3 items-center text-white font-bold hidden group-hover:flex'>
                                <div><BsFillChatFill size={25} /></div>
                                <p className='inline-block'>0</p>
                            </div>
                        </div>
                    ))}
                </div>}
            {(userPostsById === [] || !userPostsById || userPostsById?.length === 0) && <EmptyPosts />}
        </div>
    )
}

export default UsersPostsById
