import React from 'react'
import { BsThreeDots, BsSave2, BsBookmarkCheck } from 'react-icons/bs'
import { FaRegHeart, FaRegComment,FaRegSmile } from 'react-icons/fa'
import { RiShareForwardLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';
const Posts = () => {
  return (
    <div className='mt-4'>
      <div className='w-full h-auto pb-5 bg-white rounded-lg border'>
        <div className='flex justify-between mt-3 px-3'>
          <div className='flex'>
            <img className="p-1 w-14 h-14 rounded-full focus:ring-2 focus:ring-gray-300" src="/Images/profile.jpg" alt="" />
            <div className='ml-2 mt-2'>
              <p className='text-md font-poppins font-medium'>AbdElrahaammn</p>
              <p className='font-then text-sm'>London, United Kingdom</p>
            </div>
          </div>
          <button className='mr-2 py-0 h-1 mt-2'>
            <BsThreeDots />
          </button>
        </div>
        <div className='mt-3'>
          <img className='' src='Images/post.avif' alt=''></img>
        </div>
        <div className='flex justify-between mt-4 px-4 text-2xl'>
          <div className='flex gap-4'>
            <FaRegHeart />
            <FaRegComment />
            <RiShareForwardLine />
          </div>
          <div><BsBookmarkCheck /></div>
        </div>
        <div className='ml-4 mt-4'>
          <p className='text-md font-semibold'>551 Likes</p>
          <Link className='font-bold mr-2'>emilia clark</Link>
          <p className=' inline font-semilight'>My boy looks like an angel, but in his desperate need to be on camera, he nearly destroyed a set.... more</p>
          <Link className='block text-gray-500 font-lg font-extralight'>View all 1054 comments</Link>
          <p className='font-light text-sm mt-3 text-gray-500'>2 DAYS AGO</p>
        </div>
        <div className='flex px-3 border-t pt-3 mt-2'>
          <div className='text-2xl pl-1 pr-2'><FaRegSmile/></div>
          <input className='outline-none' placeholder='Add Comment ...'/>
          <button className='text-blue-500 focus:text-blue-400 font-semibold ml-auto'>Post</button>
        </div>
      </div>
    </div>
  )
}

export default Posts
