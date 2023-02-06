import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';

const ModalUserByIdSettings = () => {
    const { isModalSittings } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = isModalSittings ? 'hidden' : 'auto';
    }, [isModalSittings]);

    return (
        isModalSittings &&
        <>
            <div onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} className="fixed inset-0 bg-black/30 z-20"></div>
            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 space-y-5 top-[25%] container max-w-lg z-30 bg-white w-full rounded-xl shadow drop-shadow-xl !p-0 overflow-hidden'
            >
                <div className='w-full text-center mx-auto'>
                    <span className='block cursor-pointer text-red-600 font-bold py-4 hover:bg-gray-100'>Block</span><hr />
                    <span className='block cursor-pointer text-red-600 font-bold py-4 hover:bg-gray-100'>Restrict</span><hr />
                    <span className='block cursor-pointer text-red-600 font-bold py-4 hover:bg-gray-100'>Report</span><hr />
                    <span className='block cursor-pointer focus:bg-gray-500 py-4 hover:bg-gray-100' onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} >Cancel</span>
                </div>
            </motion.div>

        </>
    )
}

export default ModalUserByIdSettings
