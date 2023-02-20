import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';
import { BsX } from 'react-icons/bs';
import { useUnFollowMutation } from '../../../Redux/APIs/UserApi';

const ModalUnFollowConfirm = ({ postDetails }) => {
    const dispatch = useDispatch();
    const [UnFollow] = useUnFollowMutation();
    const UnFollowHandle = () => {
        const id = postDetails?.user?._id
        UnFollow(id).unwrap()
            .then(payload => dispatch(FeatureAction.setIsModalUnfollowConfirm(false)))
            .catch(err => console.log(err))
    }
    return (
        <>
            <div onClick={() => dispatch(FeatureAction.setIsModalUnfollowConfirm(false))} className="fixed inset-0 bg-black/30 z-20"></div>
            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 container z-30 top-[30%] bg-white w-full rounded-xl shadow drop-shadow-xl overflow-hidden p-0 max-w-xs sm:max-w-[30rem]  '
            >
                <button
                    onClick={() => dispatch(FeatureAction.setIsModalUnfollowConfirm(false))}
                    className='absolute right-0 m-2'><BsX size={25} />
                </button>
                <div>
                    <div className='w-full flex justify-center py-5'>
                        <img className='h-28 w-28 rounded-full col-span-2 object-cover flex justify-center items-center my-1' src={postDetails?.user?.avatar?.url ? postDetails?.user?.avatar?.url : process.env.REACT_APP_DefaultIcon} alt='' />

                    </div>
                    <p className='text-lg flex justify-center mt-2'>UnFollow {postDetails?.user?.username} ?</p>
                </div><hr className='mt-6' />

                <div className='w-full text-center mx-auto'>
                    <div
                        onClick={UnFollowHandle}
                        className='block cursor-pointer text-red-600 font-bold py-4 hover:bg-gray-100'>UnFollow</div><hr />
                    <span
                        onClick={() => dispatch(FeatureAction.setIsModalUnfollowConfirm(false))}
                        className='block cursor-pointer font-bold py-4 hover:bg-gray-100'>Cancel
                    </span><hr />
                </div>
            </motion.div>
        </>
    )
}

export default ModalUnFollowConfirm
