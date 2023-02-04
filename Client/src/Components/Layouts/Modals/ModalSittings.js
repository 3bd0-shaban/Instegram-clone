import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';

const ModalSittings = (props) => {
    const { isModalSittings } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = isModalSittings ? 'hidden' : 'auto';
    }, [isModalSittings]);

    return (
        isModalSittings && <>

            <div onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} className="fixed inset-0 bg-black/30 z-10"></div>

            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='Modal !top-[10%] !max-h-[50rem] !overflow-hidden '
            >

                <div className='space-y-5 w-full text-center mx-auto py-6'>
                    <span className='block cursor-pointer'>Change Password</span><hr />
                    <span className='block cursor-pointer'>QR Code</span><hr />
                    <span className='block cursor-pointer'>Apps and Websites</span><hr />
                    <span className='block cursor-pointer'>Notifications</span><hr />
                    <span className='block cursor-pointer'>Privacy and scurity</span><hr />
                    <span className='block cursor-pointer'>Supervision</span><hr />
                    <span className='block cursor-pointer'>Login activity</span><hr />
                    <span className='block cursor-pointer'>Emails from Instegram</span><hr />
                    <span className='block cursor-pointer'>Report a propblem</span><hr />
                    <span className='block cursor-pointer'>Embed</span><hr />
                    <span className='block cursor-pointer'>Log Out</span><hr />
                    <span className='block cursor-pointer focus:bg-gray-500' onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} >Cancel</span>
                </div>
            </motion.div>
        </>
    )
}

export default ModalSittings
