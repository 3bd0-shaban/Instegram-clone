import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';
import { BsX, BsCheck } from 'react-icons/bs';

const ModalThanksReport = ({ userById }) => {
    const dispatch = useDispatch();


    return (
        <>
            <div onClick={() => dispatch(FeatureAction.setIsModalThanksReport(false))} className="fixed inset-0 bg-black/30 z-20"></div>
            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 container z-30 top-[25%] bg-white w-full rounded-xl shadow drop-shadow-xl overflow-hidden p-0 max-w-xs sm:max-w-[30rem]  '
            >
                <button
                    onClick={() => dispatch(FeatureAction.setIsModalThanksReport(false))}
                    className='absolute right-0 m-2'><BsX size={25} />
                </button>
                <div className='w-full flex justify-center mx-auto py-5'>
                    <div className='text-center w-full'>
                        <div className='text-green-500 rounded-full my-5 flex justify-center mx-auto items-center border-green-500 border-4 w-20 h-20'>
                            <BsCheck size={50} />
                        </div>
                        <p className='text-lg font-semibold flex justify-center'>Thanks for letting us know</p>
                        <p className='text-lg font-light text-gray-500 flex justify-center'>Your feedback is important in helping us keep the Instagram community safe.</p>
                    </div>
                </div><hr />
                <div className='w-full text-start mx-auto !mt-0'>
                    <span
                        onClick={
                            () => {
                                dispatch(FeatureAction.setIsModalBlockConfirm(true));
                                dispatch(FeatureAction.setIsModalThanksReport(false))
                            }
                        }
                        className='block cursor-pointer px-5 focus:bg-gray-500 text-red-500 font-medium py-4 hover:bg-gray-100'>Block {userById?.username}
                    </span>
                    <span
                        onClick={
                            () => {
                                dispatch(FeatureAction.setIsModalUnfollowConfirm(true));
                                dispatch(FeatureAction.setIsModalThanksReport(false))
                            }
                        }
                        className='block cursor-pointer px-5 focus:bg-gray-500 font-medium py-4 hover:bg-gray-100'>Unfollow {userById?.username}
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
