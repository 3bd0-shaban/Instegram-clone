import React from 'react'
import { Link } from 'react-router-dom'
import { useSuggestionQuery } from '../../../Redux/APIs/UserApi'

const Suggestions = () => {
  const { data } = useSuggestionQuery() || {}
  return (
    <div className=''>
      <div className='flex justify-between p-5'>
        <p className='font-semibold text-gray-600'>Suggestion for yor</p>
        <Link to='/'>See All</Link>
      </div>
      {data?.map(res => (
        <div key={res._id} className='flex justify-between items-center'>
          <Link
            to={`/${res.username}`}
            key={res._id}
            className='flex px-5'
          >
            <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300" src={res?.avatar?.url} alt="" />
            <div className='ml-2 mt-1'>
              <p className='text-md font-poppins font-medium'>{res?.username}</p>
              <p className='text-sm text-gray-500'>{res?.fullname}</p>
            </div>
          </Link>
          <button className='font-semibold text-blue-400'>follow</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
