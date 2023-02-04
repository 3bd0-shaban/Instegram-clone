import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { useFollowersListQuery } from '../../../Redux/APIs/UserApi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimModal from './../../../Animation/AnimModal';


const ModalFollowers = ({ id }) => {
  const dispatch = useDispatch();
  const { data: FollowersList } = useFollowersListQuery(id) || {};
  return (

    
    <>
      <div onClick={() => dispatch(FeatureAction.setIsModalFollowersList(false))} className="fixed inset-0 bg-black/30 z-10"></div>
      <motion.div
        variants={AnimModal}
        initial='initial'
        animate='animate'
        exit='exit'
        className='Modal'
      >
        <div className='flex justify-center items-center font-semibold text-xl pt-1'>Followers</div><hr />
        {FollowersList?.followers?.map(res => (
          <div className='flex justify-between items-center'>
            <Link
              to={`/${res.username}`}
              key={res._id}
              className='flex'
            >
              <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300" src={res?.avatar?.url} alt="" />
              <div className='ml-2 mt-1'>
                <p className='text-md font-poppins font-medium'>{res?.username}</p>
                <p className='text-sm text-gray-500'>New in Instegram</p>
              </div>
            </Link>
            <button className='font-semibold bg-blue-500 px-6 py-2 rounded-lg text-white'>follow</button>
          </div>
        ))}
      </motion.div>
    </>

  )
}

export default ModalFollowers
