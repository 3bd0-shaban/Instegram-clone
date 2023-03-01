import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFollowMutation, useSuggestionQuery } from '../../../Redux/APIs/UserApi'
import { ImSpinner3 } from 'react-icons/im';

const Suggestions = () => {
  const { data } = useSuggestionQuery() || {};


  const FollowCart = ({ res }) => {
    const [Follow, { isLoading }] = useFollowMutation() || {};
    const [isFollowing, setIsFollowing] = useState(false);
    const FollowUser = (id) => {
      Follow(id).unwrap()
        .then(payload => {
          setIsFollowing(true)
        })
        .catch(err => console.log(err))
    };

    return (
      <>
        <Link
          to={`/${res.username}`}
          key={res._id}
          className='flex px-5'
        >
          <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300"
            src={res?.avatar?.url ? res?.avatar?.url : process.env.REACT_APP_DefaultIcon} alt="" />
          <div className='ml-2 mt-1'>
            <p className='text-md font-poppins font-medium'>{res?.username}</p>
            <p className='text-sm text-gray-500'>{res?.fullname}</p>
          </div>
        </Link>
        <button onClick={() => FollowUser(res._id)}
          disabled={isFollowing}
          className='font-semibold text-blue-400'>{isFollowing ? 'Following' : isLoading ?
            <span className='mx-auto'><ImSpinner3 size={25} /> </span> : 'Follow'}</button>
      </>
    )
  }

  return (
    <>
      <div className='flex justify-between p-5'>
        <p className='font-semibold text-gray-600'>Suggestion for yor</p>
        {/* <Link to='/'>See All</Link> */}
      </div>
      {data?.map(res => (
        <div key={res._id} className='flex justify-between items-center'>
          <FollowCart res={res} />
        </div>
      ))}
    </>
  )
}

export default Suggestions
