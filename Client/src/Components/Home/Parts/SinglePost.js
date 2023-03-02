import { useEffect, useState } from 'react';
import { BsBookmark, BsBookmarkFill, BsPatchCheckFill, BsThreeDots } from 'react-icons/bs'
import { FaRegHeart, FaRegComment, FaRegSmile, FaHeart } from 'react-icons/fa'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useCreateCommentMutation, useLikeMutation, useUnLikeMutation } from '../../../Redux/APIs/CommentsApi';
import { useSaveMutation, useUnsaveMutation } from '../../../Redux/APIs/SavesApi';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useBreakpoint, Emoji, ImageSwiper } from '../../Exports';
import { motion, AnimatePresence } from 'framer-motion';
import AnimScale from './../../../Animation/AnimScale';

import AnimDropdown from '../../../Animation/AnimDropdown';
import { selectCurrentToken, selectCurrentUser, setCredentials } from '../../../Redux/Slices/UserSlice';

const SinglePost = ({ postDetail, setPostID, setPostDetails }) => {

    const [createComment, { isLoading }] = useCreateCommentMutation();
    const breakpoint = useBreakpoint();
    const MobileView = (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg');
    const dispatch = useDispatch();
    const [Like] = useLikeMutation();
    const [Save] = useSaveMutation();
    const [Unsave] = useUnsaveMutation();
    const [UnLike] = useUnLikeMutation();
    const [comment, setComment] = useState('');
    const [isPikerVisiable, setIsPikerVisable] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const userInfo = useSelector(selectCurrentUser)
    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {// eslint-disable-next-line
        const isInclude = postDetail?.likes?.some(p => p == userInfo?._id);
        // eslint-disable-next-line
        const Save = userInfo?.saves?.some(p => p == postDetail?._id);
        isInclude ? setIsLiked(true) : setIsLiked(false);
        Save ? setIsSaved(true) : setIsSaved(false);
    }, [postDetail, userInfo]);

    const CommentHandle = async (id) => {
        const data = { comment };
        if (!comment) return;
        await createComment({ data, id }).unwrap()
            .then((payload) => {
                setComment('')
                setIsPikerVisable(false)
            })
            .catch((error) => console.log(error));
    }
    const LikeSubmit = async (id) => {
        await Like(id).unwrap()
    }
    const UnLikeSubmit = async (id) => {
        await UnLike(id).unwrap()
    }
    const SaveSubmit = async (id) => {
        const user = await Save(id).unwrap()
        if (user) {
            dispatch(setCredentials({ accessToken, user }))
        }
    }
    const UnSaveSubmit = async (id) => {
        const user = await Unsave(id).unwrap()
        if (user) {
            dispatch(setCredentials({ accessToken, user }))
        }
    }
    const checkModal = () => {
        const user = postDetail.user._id === userInfo?._id
        if (user) {
            dispatch(FeatureAction.Show_ModalPostMoreLogged(false))
            return
        }
        dispatch(FeatureAction.Show_isPostMore(true))
    }

    return (
        <div className='w-full h-full pb-5 bg-white border-b overflow-hidden'>
            <div className='flex justify-between mt-3 px-3'>
                <Link to={`/${postDetail?.user?.username}`} className='flex'>
                    <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300"
                        src={postDetail?.user?.avatar?.url ? postDetail?.user?.avatar?.url : process.env.REACT_APP_DefaultIcon}
                        alt=""
                    />
                    <div className='ml-2 mt-2 flex '>
                        <span className='text-md font-poppins font-medium flex gap-2'>{postDetail?.user?.username}
                            {postDetail?.user?.isVerified &&
                                <div className='text-blue-600 mt-1 inline'>
                                    <BsPatchCheckFill size={15} />
                                </div>
                            }
                            <p className='font-light text-xs my-1 inline mx-2 text-gray-500'>
                                . {moment(postDetail?.createdAt).from()}
                            </p>
                        </span>
                        <p className='font-then text-sm'>{postDetail?.location}</p>
                    </div>
                </Link>
                <button
                    onClick={() => { checkModal(); setPostID(postDetail?._id); setPostDetails(postDetail) }}
                    className='hover:text-gray-500'>
                    <BsThreeDots size={22} />
                </button>
            </div>
            <ImageSwiper post={postDetail} />
            <div className='flex justify-between mt-4 px-4 text-2xl'>
                <div className='flex gap-4 items-center'>
                    {(isLiked && !postDetail?.hiddenlikes) ?
                        <AnimatePresence>
                            <motion.button
                                variants={AnimScale}
                                initial='initial'
                                animate='animate'
                                exit='exit'
                                onClick={() => UnLikeSubmit(postDetail?._id)}

                                className='hover:text-gray-500 cursor-pointer'>
                                <FaHeart size={28} style={{ color: 'red' }} />
                            </motion.button>
                        </AnimatePresence>
                        : (!postDetail?.hiddenlikes) &&
                        <motion.button
                            variants={AnimScale}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                            onClick={() => LikeSubmit(postDetail?._id)}
                            className='hover:text-gray-500 cursor-pointer'>
                            <FaRegHeart size={25} />
                        </motion.button>
                    }

                    {(MobileView && !postDetail?.turnoffcomments) ?
                        <Link
                            to={`/p/${postDetail?._id}`}
                            className='cursor-pointer hover:text-gray-500'>
                            <FaRegComment size={25} />
                        </Link>
                        : (!postDetail?.turnoffcomments) &&
                        <div
                            onClick={() => {
                                dispatch(FeatureAction.Show_ModalPostDetails(true));
                                setPostID(postDetail?._id);
                                setPostDetails(postDetail)
                            }}
                            className='cursor-pointer hover:text-gray-500'>
                            <FaRegComment size={25} />
                        </div>
                    }
                    {/* <button onClick={() => dispatch(FeatureAction.setIsShare(true))} className='hover:text-gray-500 cursor-pointer'>
                        <IoMdPaperPlane size={25} />
                    </button> */}
                </div>
                {isSaved ?
                    <AnimatePresence>
                        <motion.button
                            variants={AnimScale}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                            onClick={() => UnSaveSubmit(postDetail?._id)}
                            className='hover:text-gray-500 cursor-pointer'>
                            <BsBookmarkFill size={28} />
                        </motion.button>
                    </AnimatePresence>
                    :
                    <motion.button
                        variants={AnimScale}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        onClick={() => SaveSubmit(postDetail?._id)}
                        className='hover:text-gray-500 cursor-pointer'>
                        <BsBookmark size={28} />
                    </motion.button>
                }

            </div>
            <div className='ml-4 mt-4'>
                {!postDetail?.hiddenlikes && <p className='text-md font-semibold'>{postDetail?.numLikes} Likes</p>}
                <Link className='font-bold mr-2'>{postDetail?.user?.username}</Link>
                <p className=' inline font-semilight'>{postDetail?.des}</p>
                {
                    (MobileView && !postDetail?.turnoffcomments) ?
                        <Link
                            to={`/p/${postDetail?._id}`}
                            className='block text-gray-500 font-lg font-extralight'>View all {postDetail?.numComments} comments
                        </Link> : (!postDetail?.turnoffcomments) &&
                        <Link
                            onClick={
                                () => {
                                    dispatch(FeatureAction.Show_ModalPostDetails(true));
                                    setPostID(postDetail?._id); setPostDetails(postDetail)
                                }}
                            className='block text-gray-500 font-lg font-extralight'>View all {postDetail?.numComments} comments
                        </Link>
                }
            </div>
            {!postDetail?.turnoffcomments &&
                <form onSubmit={(e) => CommentHandle(postDetail?._id, e.preventDefault())} className='flex relative px-3 mt-2'>
                    <input
                        onChange={(e) => setComment(e.target.value)}
                        onFocus={() => setIsPikerVisable(false)}
                        value={comment}
                        name='comment'
                        autoComplete='off'
                        className='outline-none w-full pr-3'
                        placeholder='Add Comment ...'
                    />
                    <div className='flex gap-2'>
                        {comment &&
                            <button type='submit'
                                className='text-blue-500 focus:text-blue-400 font-semibold ml-auto'>{isLoading ? 'sending' : 'Post'}</button>
                        }
                        <div
                            onClick={() => setIsPikerVisable(!isPikerVisiable)}
                            className='text-2xl text-gray-600 pl-1 pr-2 cursor-pointer'>
                            <FaRegSmile />
                        </div>
                        {isPikerVisiable &&
                            <motion.div
                                variants={AnimDropdown}
                                initial='initial'
                                animate='animated'
                                exit='exit'
                                className='absolute z-10 bottom-8 right-0'>
                                <Emoji
                                    setComment={setComment}
                                    comment={comment} />
                            </motion.div>
                        }
                    </div>
                </form>
            }
        </div>
    )
}

export default SinglePost
