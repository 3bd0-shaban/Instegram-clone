import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';

const ModalPostMoreLogged = () => {
    const { isModalPostMoreLogged } = useSelector(state => state.Features);
    const dispatch = useDispatch();

    return (
        isModalPostMoreLogged &&
        <>
            <div onClick={() => dispatch(FeatureAction.Show_ModalPostMoreLogged(false))} className="fixed inset-0 bg-black/30 z-20"></div>

            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='Modal'
            >

                <div className="bg-white w-full rounded-xl shadow drop-shadow-xl flex justify-center items-center">
                    <div className='space-y-5 w-full text-center mx-auto py-6'>
                        <span className='block text-red-600 font-medium cursor-pointer'>Report</span><hr />
                        <span className='block text-red-600 font-medium cursor-pointer'>unfollow</span><hr />
                        <span className='block cursor-pointer'>Add to favorite</span><hr />
                        <span className='block cursor-pointer'>Go to post</span><hr />
                        <span className='block cursor-pointer'>Share to ...</span><hr />
                        <span className='block cursor-pointer'>Copy link</span><hr />
                        <span className='block cursor-pointer'>Embed</span><hr />
                        <span className='block cursor-pointer' onClick={() => dispatch(FeatureAction.Show_ModalPostMoreLogged(false))} >Cancel</span>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default ModalPostMoreLogged
