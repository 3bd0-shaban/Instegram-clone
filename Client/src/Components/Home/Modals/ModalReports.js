import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';
import { BsX } from 'react-icons/bs';

const ModalReports = () => {
    const dispatch = useDispatch();
    const HandleModals = () => {
        dispatch(FeatureAction.setIsModalThanksReport(true));
        dispatch(FeatureAction.setIsModalReports(false))
    }

    return (
        <>
            <div onClick={() => dispatch(FeatureAction.setIsModalReports(false))} className="fixed inset-0 bg-black/30 z-20"></div>
            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 top-[10%] container overflow-hidden px-0 z-40 bg-white w-full rounded-xl shadow drop-shadow-xl max-w-xs sm:max-w-[30rem]  '
            >
                <div className='relative py-3'>
                    <div className='flex justify-center items-center font-semibold text-xl pt-1'>Report</div>
                    <button
                        onClick={() => dispatch(FeatureAction.setIsModalReports(false))}
                        className='absolute right-0 top-0 m-3'><BsX size={25} />
                    </button>
                </div><hr />
                <p className='text-lg font-medium mx-5 my-3'>why are you reporting ?</p><hr />
                <div className='w-full'>
                    <span onClick={HandleModals} className='block px-5 py-4 hover:bg-gray-100 cursor-pointer'>It's spam</span><hr />
                    {/* <span onClick={HandleModals} className='block px-5 py-4 hover:bg-gray-100 cursor-pointer'>Nudity or sexual activity</span><hr /> */}
                    <span onClick={HandleModals} className='block px-5 py-4 hover:bg-gray-100 cursor-pointer'>Hate speech or symbols</span><hr />
                    <span onClick={HandleModals} className='block px-5 py-4 hover:bg-gray-100 cursor-pointer'>Voilance or dangerous orgniation</span><hr />
                    <span onClick={HandleModals} className='block px-5 py-4 hover:bg-gray-100 cursor-pointer'>Sales of illegal or regulated goods</span><hr />
                    <span onClick={HandleModals} className='block px-5 py-4 hover:bg-gray-100 cursor-pointer'>Bulling or harmassment</span><hr />
                    <span onClick={HandleModals} className='block px-5 py-4 hover:bg-gray-100 cursor-pointer'>Intellactual property voilance </span><hr />
                    <span onClick={HandleModals} className='block px-5 py-4 hover:bg-gray-100 cursor-pointer'>Suicide or self-injury</span><hr />
                    <span onClick={HandleModals} className='block px-5 py-4 hover:bg-gray-100 cursor-pointer'>Eating disordrs</span><hr />
                    <span onClick={HandleModals} className='block px-5 py-4 hover:bg-gray-100 cursor-pointer'>Scam or fraud</span><hr />
                    {/* <span onClick={HandleModals} className='block px-5 py-4 hover:bg-gray-100 cursor-pointer'>False information</span><hr /> */}
                    <span onClick={HandleModals} className='block px-5 py-4 hover:bg-gray-100 cursor-pointer'>I just don't like it</span><hr />
                </div>
            </motion.div>
        </>
    )
}

export default ModalReports
