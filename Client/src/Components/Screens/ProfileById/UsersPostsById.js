import React, { useState } from 'react'
import { BsCamera, BsFillChatFill } from 'react-icons/bs'
import { useGetUserPostsByIdQuery } from '../../../Redux/APIs/PostsApi';
import { ImSpinner3 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { ModalPostDetails } from '../../Exports';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';

const UsersPosts = (props) => {
    const { data: userPostsById, isFeatching, error, isError } = useGetUserPostsByIdQuery(props.ID) || {};
    const { isModalPostDetails } = useSelector(state => state.Features);
    const [postID, setPostID] = useState('');
    const dispatch = useDispatch();

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
        <div className='container max-w-6xl px-0'>
            {isModalPostDetails && <ModalPostDetails ID={postID} />}
            {isError && <p>{error?.data?.msg}</p>}
            {isFeatching && <p className='flex justify-center items-center text-3xl font-medium animate-spin'><ImSpinner3 /></p>}
            {(userPostsById === [] || !userPostsById || userPostsById?.length === 0) && <EmptyPosts />}
            <div className='grid grid-cols-3 gap-2 lg:gap-8 mt-7'>
                {userPostsById && userPostsById?.map((post) => (
                    <div onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(post?._id) }} key={post._id} className='h-80 cursor-pointer hover:brightness-50 duration-200 group relative'>
                        <img className='object-cover w-full h-full' src={post?.images[0]?.url} alt='' />
                        <div className='absolute inset-1/2 left-[45%] z-10 gap-3 items-center text-white font-bold hidden group-hover:flex'>
                            <div><BsFillChatFill size={25} /></div>
                            <p className='inline-block'>0</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersPosts
