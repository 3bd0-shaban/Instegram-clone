import React from 'react'
import { Link } from 'react-router-dom';
import { useSearchQuery } from '../../Redux/APIs/UserApi'

const Search = ({ keyword, pagnum, setOpenSearch }) => {
  const { data: result } = useSearchQuery({ keyword, pagnum }) || {};
  return (
    <div className='bg-white z-10 py-5 w-[28rem] rounded-xl border'>
      {result?.map(res => (
        <Link
          to={`/${res.username}`}
          key={res._id}
          className='flex'
          onMouseEnter={() => setOpenSearch(true)}
        >
          <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300" src={res?.avatar?.url} alt="" />
          <div className='ml-2 mt-2'>
            <p className='text-md font-poppins font-medium'>{res?.username}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Search
