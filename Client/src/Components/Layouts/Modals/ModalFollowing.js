import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { useFollowingListQuery } from '../../../Redux/APIs/UserApi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';

const ModalFollowing = ({ id }) => {
    const { isModalFollowingList } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    const { data: FollowingList } = useFollowingListQuery(id) || {};
    return (
        isModalFollowingList &&
        <>
            <div onClick={() => dispatch(FeatureAction.setIsModalFollowingList(false))} className="fixed inset-0 bg-black/40 z-10"></div>

            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='Modal'
            >
                <div className='flex justify-center items-center font-semibold text-xl pt-1'>Following</div><hr />

                {FollowingList?.follwing?.map(res => (
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
                        <button className='font-semibold text-blue-400'>follow</button>
                    </div>
                ))}
            </motion.div>

        </>
    )
}

export default ModalFollowing
