import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFollowMutation, useSuggestionQuery } from '../../../Redux/APIs/UserApi'
import { ImSpinner3 } from 'react-icons/im';
import { SkilSuggestion } from '../../Exports';
import { BsPatchCheckFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './../../../Redux/Slices/UserSlice';

const Suggestions = () => {
  const { data, isFetching, isError, error } = useSuggestionQuery() || {};
  const UserInfo = useSelector(selectCurrentUser)
  const suggestion = data?.filter(p => p._id !== UserInfo._id);
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
          <div className='flex gap-2'>
            <div className='ml-2 mt-1'>
              <p className='text-md font-poppins font-medium'>{res?.username}</p>
              <p className='text-sm text-gray-500'>{res?.fullname}</p>
            </div>
            {res.isVerified &&
              <div className='text-blue-600 mt-1'>
                <BsPatchCheckFill size={15} />
              </div>
            }
          </div>
        </Link>
        <button onClick={() => FollowUser(res._id)}
          disabled={isFollowing}
          className='font-semibold text-blue-400'>{isFollowing ? 'Following' : isLoading ?
            <span className='mx-auto'><ImSpinner3 size={25} /> </span> : 'Follow'}
        </button>
      </>
    )
  }

  return (
    <>
      <div className='flex justify-between p-5'>
        <p className='font-semibold text-gray-600'>Suggestion for yor</p>
        {/* <Link to='/'>See All</Link> */}
      </div>
      {isFetching ?
        <div className='space-y-2'>
          <SkilSuggestion />
          <SkilSuggestion />
          <SkilSuggestion />
          <SkilSuggestion />
          <SkilSuggestion />
        </div>
        : isError ? <p>{error?.data?.msg}</p> :
          suggestion?.map(res => (
            <div key={res._id} className='flex justify-between items-center'>
              <FollowCart res={res} />
            </div>
          ))}
    </>
  )
}

export default Suggestions
