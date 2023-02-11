import { useEffect, useState } from 'react';
import { BsBookmark, BsBookmarkFill, BsThreeDots } from 'react-icons/bs'
import { FaRegHeart, FaRegComment, FaRegSmile, FaHeart } from 'react-icons/fa'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useGetUserQuery } from '../../../Redux/APIs/UserApi';
import { useCreateCommentMutation, useLikeMutation, useUnLikeMutation } from '../../../Redux/APIs/CommentsApi';
import { IoMdPaperPlane } from 'react-icons/io';
import { useSaveMutation, useUnsaveMutation } from '../../../Redux/APIs/SavesApi';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
import { useBreakpoint, Emoji, ImageSwiper } from '../../Exports';
import { motion, AnimatePresence } from 'framer-motion';
import AnimScale from './../../../Animation/AnimScale';

import AnimDropdown from '../../../Animation/AnimDropdown';

const SinglePost = ({ post, postID, setPostID }) => {
    const [createComment] = useCreateCommentMutation();
    const { data: userInfo } = useGetUserQuery() || {};
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

    useEffect(() => {// eslint-disable-next-line
        const isInclude = post?.likes?.some(p => p == userInfo?._id);
        // eslint-disable-next-line
        const Save = userInfo?.saves?.some(p => p == post?._id);
        isInclude ? setIsLiked(true) : setIsLiked(false);
        Save ? setIsSaved(true) : setIsSaved(false);
    }, [post, userInfo]);
    const data = { comment };
    const CommentHandle = async (id) => {
        if (!comment) return;
        await createComment({ data, id }).unwrap()
            .then((payload) => setComment(''))
            .catch((error) => console.log(error));
    }
    const LikeSubmit = async (id) => {
        await Like(id).unwrap()
    }
    const UnLikeSubmit = async (id) => {
        await UnLike(id).unwrap()
    }
    const SaveSubmit = async (id) => {
        await Save(id).unwrap()
    }
    const UnSaveSubmit = async (id) => {
        await Unsave(id).unwrap()
    }
    return (
        <div className='w-full h-auto pb-5 bg-white border-b'>
            <div className='flex justify-between mt-3 px-3'>
                <div className='flex'>
                    <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300"
                        src={post?.user?.avatar?.url}
                        alt=""
                    />
                    <div className='ml-2 mt-2'>
                        <span className='text-md font-poppins font-medium'>{post?.user?.username}
                            <p className='font-light text-xs my-3 inline mx-2 text-gray-500'>
                                . {moment(post?.createdAt).from()}
                            </p>
                        </span>
                        <p className='font-then text-sm'>{post?.location}</p>
                    </div>
                </div>
                <button
                    onClick={() => { dispatch(FeatureAction.Show_isPostMore(true)); setPostID(post?._id) }}
                    className='hover:text-gray-500'>
                    <BsThreeDots size={22} />
                </button>
            </div>
            <ImageSwiper post={post} />
            <div className='flex justify-between mt-4 px-4 text-2xl'>
                <div className='flex gap-4 items-center'>
                    {isLiked ?
                        <button
                            onClick={() => UnLikeSubmit(post?._id)}
                            className='hover:text-gray-500 text-red-500'>
                            <FaHeart size={28} style={{ color: 'red' }} />
                        </button> :
                        <button
                            onClick={() => LikeSubmit(post?._id)}
                            className='hover:text-gray-500'>
                            <FaRegHeart size={25} />
                        </button>}

                    {MobileView ?
                        <Link
                            to={`/p/${post?._id}`}
                            className='cursor-pointer hover:text-gray-500'>
                            <FaRegComment size={25} />
                        </Link>
                        :
                        <div
                            onClick={() => {
                                dispatch(FeatureAction.Show_ModalPostDetails(true));
                                setPostID(post?._id)
                            }}
                            className='cursor-pointer hover:text-gray-500'>
                            <FaRegComment size={25} />
                        </div>}
                    <button className='hover:text-gray-500 cursor-pointer'>
                        <IoMdPaperPlane size={25} />
                    </button>
                </div>
                {isSaved ?
                    <AnimatePresence>
                        <motion.button
                            variants={AnimScale}
                            initial='intial'
                            animate='animate'
                            exit='exit'
                            onClick={() => UnSaveSubmit(post?._id)}
                            className='hover:text-gray-500 cursor-pointer'>
                            <BsBookmarkFill size={28} />
                        </motion.button>
                    </AnimatePresence>
                    :
                    <motion.button
                        variants={AnimScale}
                        initial='intial'
                        animate='animate'
                        exit='exit'
                        onClick={() => SaveSubmit(post?._id)}
                        className='hover:text-gray-500 cursor-pointer'>
                        <BsBookmark size={28} />
                    </motion.button>
                }

            </div>
            <div className='ml-4 mt-4'>
                <p className='text-md font-semibold'>{post?.numLikes} Likes</p>
                <Link className='font-bold mr-2'>{post?.user?.username}</Link>
                <p className=' inline font-semilight'>{post?.des}</p>
                {MobileView ?
                    <Link
                        to={`/p/${post?._id}`}
                        className='block text-gray-500 font-lg font-extralight'>View all {post?.numComments} comments
                    </Link> :
                    <Link
                        onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(post?._id) }}
                        className='block text-gray-500 font-lg font-extralight'>View all {post?.numComments} comments
                    </Link>
                }
            </div>
            <form onSubmit={(e) => CommentHandle(post?._id, e.preventDefault())} className='flex relative px-3 mt-2'>
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
                            className='text-blue-500 focus:text-blue-400 font-semibold ml-auto'>Post</button>
                    }
                    <div
                        onClick={() => setIsPikerVisable(!isPikerVisiable)}
                        className='text-2xl text-gray-600 pl-1 pr-2 cursor-pointer'>
                        <FaRegSmile />
                    </div>
                    <AnimatePresence>
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
                    </AnimatePresence>
                </div>
            </form>
        </div>
    )
}

export default SinglePost
