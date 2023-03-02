import React from 'react'
import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from './../../../Animation/AnimModal';
const ModalConfirm = ({ OnCloseEvent }) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="fixed inset-0 bg-black/20 z-40" onClick={() => dispatch(FeatureAction.Show_ModalConfirm(false))}></div>
            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 top-[38%] container px-0 z-40 bg-white w-full rounded-xl shadow drop-shadow-xl overflow-hidden max-w-xs sm:max-w-[30rem]'>
                
                <div className="relative rounded-lg shadow-[0_0px_100px_10px_rgba(0,0,0,0.3)]">
                    <div className="text-center pt-4">
                        <div className='mx-auto py-6'>
                            <p className='text-2xl font-medium py-2'>Discard post?</p>
                            <h3 className="mb-5 text-lg font-light text-gray-800">If you leave, your edits will not be saved.</h3>
                        </div><hr />
                        <div className='block text-lg text-red-600 font-medium py-3 cursor-pointer hover:bg-gray-100' onClick={OnCloseEvent}>Discard</div><hr />
                        <div className='block text-lg text-gray-700 font-normal py-3 cursor-pointer hover:bg-gray-100 hover:rounded-lg' onClick={() => dispatch(FeatureAction.Show_ModalConfirm(false))}>Cancel</div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default ModalConfirm
