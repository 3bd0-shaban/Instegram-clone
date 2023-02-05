import React from 'react'
import { Link } from 'react-router-dom'

const Stories = () => {
  const array = [1, 2, 3, 4, 5,6]
  return (
    <div className=''>
      <div className='w-full flex items-center justify-center'>
        <div className='w-full grid grid-cols-5 items-center justify-center md:grid-cols-6 gap-x-3'>
          {array.map(item => (
            <Link to='/stories/abdo/215' className='w-full'>
              <img className="w-16 h-16 mx-auto rounded-full p-0.5 bg-origin-border ringStory" src="/Images/profile.jpg" alt="" />
              <p className='text-sm flex justify-center text-start mt-3 overflow-hidden'>AbdElrahaman</p>
            </Link>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Stories
