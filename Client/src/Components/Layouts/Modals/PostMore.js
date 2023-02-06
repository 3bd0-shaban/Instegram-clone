import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';

const PostMore = (props) => {
    const { isPostMore } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = isPostMore ? 'hidden' : 'auto';
    }, [isPostMore]);

    return (
        isPostMore &&
        <>
            <div onClick={() => dispatch(FeatureAction.Show_isPostMore(false))} className="fixed inset-0 bg-black/30 z-20"></div>
            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 max-h-[40rem] top-[25%] container px-0 max-w-xl z-40 bg-white w-full rounded-xl shadow drop-shadow-xl'
            >
                <div className='w-full text-center mx-auto'>
                    <span className='block py-5 hover:bg-gray-100 hover:rounded-t-xl text-red-600 font-medium cursor-pointer'>Report</span><hr />
                    <span className='block py-5 hover:bg-gray-100 text-red-600 font-medium cursor-pointer'>unfollow</span><hr />
                    <span className='block py-5 hover:bg-gray-100 cursor-pointer'>Add to favorite</span><hr />
                    <span className='block py-5 hover:bg-gray-100 cursor-pointer'>Go to post</span><hr />
                    <span className='block py-5 hover:bg-gray-100 cursor-pointer'>Share to ...</span><hr />
                    <span className='block py-5 hover:bg-gray-100 cursor-pointer'>Copy link</span><hr />
                    <span className='block py-5 hover:bg-gray-100 cursor-pointer'>Embed</span><hr />
                    <span
                        className='block py-5 hover:bg-gray-100 hover:rounded-b-xl cursor-pointer'
                        onClick={() => dispatch(FeatureAction.Show_isPostMore(false))} >Cancel
                    </span>
                </div>
            </motion.div>
        </>

    )
}

export default PostMore
