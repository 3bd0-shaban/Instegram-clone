import React from 'react'
import { useState } from 'react';
import { BsThreeDots, BsBookmarkCheck } from 'react-icons/bs'
import { FaRegHeart, FaRegComment, FaRegSmile } from 'react-icons/fa'
import { RiShareForwardLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetFollowersPostsQuery } from '../../../Redux/APIs/PostsApi';
import { PostMore, ModalPostDetails } from '../../Exports';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import moment from 'moment';
const Posts = () => {
  const dispatch = useDispatch();
  const { data: followerposts, isFeatching, error, isError } = useGetFollowersPostsQuery() || {};
  const [postID, setPostID] = useState('');
  console.log(followerposts)
  return (
    <>
      <ModalPostDetails ID={postID} />
      <PostMore onClose={() => dispatch(FeatureAction.Show_isPostMore(false))} />
      {isFeatching ? <div></div> : isError ? <p>{error?.data?.msg}</p> :
        followerposts?.map(post => (
          <div key={post._id} className='mt-4'>
            <div className='w-full h-auto pb-5 bg-white rounded-lg border'>
              <div className='flex justify-between mt-3 px-3'>
                <div className='flex'>
                  <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300" src={post?.user?.avatar?.url} alt="" />
                  <div className='ml-2 mt-2'>
                    <p className='text-md font-poppins font-medium'>{post?.user?.fullname}</p>
                    <p className='font-then text-sm'>{post?.location}</p>
                  </div>
                </div>
                <button onClick={() => dispatch(FeatureAction.Show_isPostMore(true))} className='mr-2 py-0 h-1 mt-2'>
                  <BsThreeDots />
                </button>
              </div>
              <div className='mt-3'>
                <img className='' src={post?.images[0]?.url} alt=''></img>
              </div>
              <div className='flex justify-between mt-4 px-4 text-2xl'>
                <div className='flex gap-4'>
                  <FaRegHeart />
                  <div onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(post?._id) }} className='cursor-pointer focus:animate-bounce'>
                    <FaRegComment />
                  </div>
                  <RiShareForwardLine />
                </div>
                <div><BsBookmarkCheck /></div>
              </div>
              <div className='ml-4 mt-4'>
                <p className='text-md font-semibold'>{post?.likesnumber} Likes</p>
                <Link className='font-bold mr-2'>emilia clark</Link>
                <p className=' inline font-semilight'>{post?.des}</p>
                <Link onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(post?._id) }} className='block text-gray-500 font-lg font-extralight'>View all {post?.commentsnumber} comments</Link>
                <p className='font-light text-sm my-3 text-gray-500'>{moment(post?.createtAt).calendar()}</p>
              </div>
              <div className='flex px-3 border-t pt-3 mt-2'>
                <div className='text-2xl pl-1 pr-2'><FaRegSmile /></div>
                <input className='outline-none w-full mr-2' placeholder='Add Comment ...' />
                <button className='text-blue-500 focus:text-blue-400 font-semibold ml-auto'>Post</button>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default Posts
