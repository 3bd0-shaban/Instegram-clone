import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';
import { Link } from 'react-router-dom';
import { useDeletePostsMutation, useHideLikesMutation, useTurnCommentsMutation } from '../../../Redux/APIs/PostsApi';

const ModalPostMoreLogged = ({ PostId, postDetails, onDeleteSuccess }) => {
    const { isModalPostDetails } = useSelector(state => state.Features)
    const dispatch = useDispatch();
    const [DeletePosts] = useDeletePostsMutation();
    const [HideLikes] = useHideLikesMutation();
    const [TurnoffComments] = useTurnCommentsMutation();
    const id = PostId
    const HandleDeletePost = () => {
        DeletePosts(id).unwrap()
            .then(() => {
                dispatch(FeatureAction.Show_ModalPostMoreLogged(false))
                onDeleteSuccess();
            }).catch(err => {
                console.log(err?.data?.msg)
            })
    }
    const HandleHideLikes = () => {
        HideLikes(id).unwrap()
            .then(() => {
                dispatch(FeatureAction.Show_ModalPostMoreLogged(false));
            }).catch(err => {
                console.log(err?.data?.msg)
            })
    }
    const HandleTurnComments = () => {
        TurnoffComments(id).unwrap()
            .then(() => {
                dispatch(FeatureAction.Show_ModalPostMoreLogged(false));
            }).catch(err => {
                console.log(err?.data?.msg)
            })
    }
    return (
        <>
            <div onClick={() => dispatch(FeatureAction.Show_ModalPostMoreLogged(false))} className="fixed inset-0 bg-black/30 z-20"></div>

            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 max-h-[40rem] top-[25%] container px-0 z-40 overflow-hidden bg-white w-full rounded-xl shadow drop-shadow-xl max-w-xs sm:max-w-[30rem]'
            >

                <div className="bg-white w-full rounded-xl shadow drop-shadow-xl flex justify-center items-center">
                    <div className='w-full text-center mx-auto'>
                        <span onClick={HandleDeletePost} className='block text-red-600 py-4 hover:bg-gray-100 font-medium cursor-pointer'>Delete</span><hr />
                        {/* <span className='block py-4 hover:bg-gray-100 cursor-pointer'>Edit</span><hr /> */}
                        <span onClick={HandleHideLikes} className='block py-4 hover:bg-gray-100 cursor-pointer'>
                            {postDetails?.hiddenlikes ?
                                'Show like count' : 'Hide like count'}</span><hr />
                        <span onClick={HandleTurnComments} className='block py-4 hover:bg-gray-100 cursor-pointer'>
                            {postDetails?.turnoffcomments ?
                                'Turn on commeting' : 'Turn off commenting'}</span><hr />
                        <Link to={`/p/${PostId}`}
                            onClick={() => {
                                dispatch(FeatureAction.Show_ModalPostMoreLogged(false));
                                if (isModalPostDetails) {
                                    dispatch(FeatureAction.Show_ModalPostDetails(false));
                                }
                            }}
                            className='block py-4 hover:bg-gray-100 cursor-pointer'>Go to post
                        </Link><hr />
                        <span className='block py-4 hover:bg-gray-100 cursor-pointer'
                            onClick={() => dispatch(FeatureAction.Show_ModalPostMoreLogged(false))} >Cancel
                        </span>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default ModalPostMoreLogged
