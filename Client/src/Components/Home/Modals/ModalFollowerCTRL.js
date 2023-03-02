import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';
import { BsX } from 'react-icons/bs';
import { useUnFollowMutation } from '../../../Redux/APIs/UserApi';

const ModalFollowerCTRL = ({ userInfo }) => {
    const dispatch = useDispatch();
    const [UnFollow] = useUnFollowMutation();
    const UnFollowHandle = () => {
        const id = userInfo?._id
        UnFollow(id).unwrap()
            .then(payload => dispatch(FeatureAction.setIsModalFollowerCTRL(false)))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div onClick={() => dispatch(FeatureAction.setIsModalFollowerCTRL(false))} className="fixed inset-0 bg-black/30 z-20"></div>
            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 container z-30 top-[20%] bg-white w-full rounded-xl shadow drop-shadow-xl overflow-hidden p-0 max-w-xs sm:max-w-[30rem]  '
            >
                <button
                    onClick={() => dispatch(FeatureAction.setIsModalFollowerCTRL(false))}
                    className='absolute right-0 m-2'><BsX size={25} />
                </button>
                <div className='w-full flex justify-center py-5'>
                    <div>
                        <img className='h-28 w-28 rounded-full col-span-2 object-cover flex justify-center items-center' src={userInfo?.avatar?.url} alt='' />
                        <p className='text-lg font-semibold flex justify-center'>{userInfo?.username}</p>
                    </div>
                </div><hr />
                <div className='w-full text-start mx-auto !mt-0'>
                    <span onClick={
                        () => {
                            dispatch(FeatureAction.setIsModalBlockConfirm(true));
                            dispatch(FeatureAction.setIsModalFollowerCTRL(true));
                        }
                    }
                        className='block cursor-pointer text-red-600 font-bold p-5 hover:bg-gray-100'>Block</span><hr />
                    {/* <span className='block cursor-pointer text-red-600 font-bold py-4 hover:bg-gray-100'>Restrict</span><hr /> */}
                    <span onClick={
                        () => {
                            dispatch(FeatureAction.setIsModalReports(true));
                            dispatch(FeatureAction.setIsModalFollowerCTRL(true))
                        }} className='block cursor-pointer text-red-600 font-bold p-5 hover:bg-gray-100'>Report</span><hr />
                    {/* <div className='flex justify-between items-center px-5 cursor-pointer focus:bg-gray-500 py-4 hover:bg-gray-100'>
                        <span >Add to close friends list</span>
                        <span className='rounded-full border-2 border-black p-1 flex justify-center items-center'>
                            <AiOutlineStar size={17} />
                        </span>
                    </div><hr />
                    <div className='flex justify-between items-center px-5 cursor-pointer focus:bg-gray-500 py-4 hover:bg-gray-100'>
                        <span >Add to favorites</span> <AiOutlineStar size={25} />
                    </div><hr />
                    <span className='block cursor-pointer px-5 focus:bg-gray-500 py-4 hover:bg-gray-100'>Mute</span><hr /> */}
                    {/* <span className='block cursor-pointer px-5 focus:bg-gray-500 py-4 hover:bg-gray-100'>Restrict</span><hr /> */}
                    <span
                        onClick={UnFollowHandle}
                        className='block cursor-pointer p-5 focus:bg-gray-500 hover:bg-gray-100'>Unfollow
                    </span>
                    <hr />
                    <span
                        className='block cursor-pointer p-5 focus:bg-gray-500 hover:bg-gray-100'
                        onClick={() => dispatch(FeatureAction.setIsModalFollowerCTRL(false))} >Cancel
                    </span>
                </div>
            </motion.div>
        </>
    )
}

export default ModalFollowerCTRL
