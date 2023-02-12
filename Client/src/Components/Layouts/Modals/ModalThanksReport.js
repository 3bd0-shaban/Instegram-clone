import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';
import { BsX, BsCheck } from 'react-icons/bs';
import { useUnFollowMutation } from '../../../Redux/APIs/UserApi';

const ModalThanksReport = ({ postDetails }) => {
    const dispatch = useDispatch();
    const [UnFollow] = useUnFollowMutation();
    const UnFollowHandle = () => {
        const id = postDetails?.user?._id
        UnFollow(id).unwrap()
            .then(payload => dispatch(FeatureAction.setIsModalThanksReport(false)))
            .catch(err => console.log(err))
    }
    const BlockHandler = () => {
    }
    return (
        <>
            <div onClick={() => dispatch(FeatureAction.setIsModalThanksReport(false))} className="fixed inset-0 bg-black/30 z-20"></div>
            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 container z-30 top-[20%] bg-white w-full rounded-xl shadow drop-shadow-xl overflow-hidden p-0 max-w-xs sm:max-w-[30rem]  '
            >
                <button
                    onClick={() => dispatch(FeatureAction.setIsModalThanksReport(false))}
                    className='absolute right-0 m-2'><BsX size={25} />
                </button>
                <div className='w-full flex justify-center mx-auto py-5'>
                    <div className='text-center'>
                        <div className='text-green-500 rounded-full my-5 mx-auto flex justify-center items-center border-green-500 border-4 w-[4.5rem]'>
                            <BsCheck size={50} />
                        </div>
                        <p className='text-lg font-semibold flex justify-center'>Thanks for letting us know</p>
                        <p className='text-lg font-light text-gray-500 flex justify-center'>Your feedback is important in helping us keep the Instagram community safe.</p>
                    </div>
                </div><hr />
                <div className='w-full text-start mx-auto !mt-0'>
                    <span
                        onClick={BlockHandler}
                        className='block cursor-pointer px-5 focus:bg-gray-500 text-red-500 font-medium py-4 hover:bg-gray-100'>Block {postDetails?.user?.username}
                    </span>
                    <span
                        onClick={UnFollowHandle}
                        className='block cursor-pointer px-5 focus:bg-gray-500 font-medium py-4 hover:bg-gray-100'>Unfollow {postDetails?.user?.username}
                    </span>
                    <hr />
                    <div className='mx-7 my-4 bg-blue-600 rounded-md text-center text-white font-semibold text-lg'>
                        <span
                            className='block cursor-pointer px-5 focus:bg-blue-700 w-full mx-auto py-2 '
                            onClick={() => dispatch(FeatureAction.setIsModalThanksReport(false))} >Cancel
                        </span>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default ModalThanksReport
