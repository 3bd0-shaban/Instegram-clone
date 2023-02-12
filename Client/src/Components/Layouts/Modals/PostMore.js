import { useDispatch } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';
import { Link, useNavigate } from 'react-router-dom';
const Website = process.env.REACT_APP_Website
const PostMore = ({ PostId, postDetails }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(postDetails)
    return (
        <>
            <div onClick={() => dispatch(FeatureAction.Show_isPostMore(false))} className="fixed inset-0 bg-black/30 z-20"></div>
            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 max-h-[40rem] top-[25%] container px-0 z-40 bg-white w-full rounded-xl shadow drop-shadow-xl max-w-xs sm:max-w-[30rem]  '
            >
                <div className='w-full text-center mx-auto'>
                    <div
                        onClick={
                            () => {
                                dispatch(FeatureAction.setIsModalReports(true));
                                dispatch(FeatureAction.Show_isPostMore(false))
                            }}
                        className='block py-4 hover:bg-gray-100 hover:rounded-t-xl text-red-600 font-medium cursor-pointer'>Report</div><hr />
                    <div
                        onClick={
                            () => {
                                dispatch(FeatureAction.setIsModalUnfollowConfirm(true));
                                dispatch(FeatureAction.Show_isPostMore(false))
                            }
                        }
                        className='block py-4 hover:bg-gray-100 text-red-600 font-medium cursor-pointer'>unfollow
                    </div><hr />

                    <span className='block py-4 hover:bg-gray-100 cursor-pointer'>Add to favorite</span><hr />

                    <Link to={`/p/${PostId}`}
                        onClick={() => dispatch(FeatureAction.Show_isPostMore(false))}
                        className='block py-4 hover:bg-gray-100 cursor-pointer'>Go to post
                    </Link><hr />

                    <div
                        onClick={() => { dispatch(FeatureAction.Show_isPostMore(false)); navigate(`/${postDetails?.user?.username}`) }}
                        className='block py-4 hover:bg-gray-100 cursor-pointer'>About this account</div><hr />

                    <span
                        onClick={() => {
                            navigator.clipboard.writeText(`${Website}/p/${PostId}`);
                            dispatch(FeatureAction.setIsClipAlert())
                            dispatch(FeatureAction.Show_isPostMore(false))
                        }} className='block py-4 hover:bg-gray-100 cursor-pointer'>Copy link
                    </span><hr />

                    <span className='block py-4 hover:bg-gray-100 cursor-pointer'>Embed</span><hr />

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
