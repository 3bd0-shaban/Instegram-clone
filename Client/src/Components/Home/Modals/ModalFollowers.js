import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { useFollowersListQuery } from '../../../Redux/APIs/UserApi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimModal from './../../../Animation/AnimModal';
import { ImSpinner3 } from 'react-icons/im';


const ModalFollowers = ({ id }) => {
  const dispatch = useDispatch();
  const { data: FollowersList, isFetching } = useFollowersListQuery(id) || {};
  return (


    <>
      <div onClick={() => dispatch(FeatureAction.setIsModalFollowersList(false))} className="fixed inset-0 bg-black/30 z-20"></div>
      <motion.div
        variants={AnimModal}
        initial='initial'
        animate='animate'
        exit='exit'
        className='fixed inset-x-0 h-[30rem] lg:h-[40rem] space-y-5 overflow-y-scroll top-[13%] p-4 container max-w-xs sm:max-w-[30rem]  z-30 hideScrollBare bg-white w-full rounded-xl shadow drop-shadow-xl '
      >
        <div className='flex justify-center items-center font-semibold text-xl pt-1'>Followers</div><hr />
        {isFetching ? <div className='py-32 flex justify-center'><ImSpinner3 size={30} /></div> :
          FollowersList?.followers?.map((res, index) => (
            <div key={index} className='flex justify-between items-center'>
              <Link
                to={`/${res.username}`}
                key={res._id}
                className='flex'
                onClick={() => dispatch(FeatureAction.setIsModalFollowersList(false))}
              >
                <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300" src={res?.avatar?.url ?res?.avatar?.url:process.env.REACT_APP_DefaultIcon} alt="" />
                <div className='ml-2 mt-1'>
                  <p className='text-md font-poppins font-medium'>{res?.username}</p>
                  <p className='text-sm text-gray-500'>{res?.fullname}</p>
                </div>
              </Link>
              {/* <button className='font-semibold bg-blue-500 px-6 py-2 rounded-lg text-white'>follow</button> */}
            </div>
          ))}
      </motion.div>
    </>

  )
}

export default ModalFollowers
