import { useEffect, useState } from 'react';
import { BsBookmarkCheck, BsThreeDots } from 'react-icons/bs'
import { FaRegHeart, FaRegComment, FaRegSmile, FaHeart } from 'react-icons/fa'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useGetUserQuery } from '../../../Redux/APIs/UserApi';
import { useCreateCommentMutation, useLikeMutation, useUnLikeMutation } from '../../../Redux/APIs/CommentsApi';
import { IoMdPaperPlane } from 'react-icons/io';
import { useSaveMutation } from '../../../Redux/APIs/SavesApi';
import { useGetFollowersPostsQuery } from '../../../Redux/APIs/PostsApi';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
import { useBreakpoint } from '../../Exports';
const SinglePost = ({ post, postID, setPostID }) => {
    const [createComment] = useCreateCommentMutation();
    const { data: userInfo } = useGetUserQuery() || {};
    const { data: followerposts } = useGetFollowersPostsQuery() || {};
    const breakpoint = useBreakpoint();
    const MobileView = (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg');
    const dispatch = useDispatch();
    const [Like] = useLikeMutation();
    const [Save] = useSaveMutation();
    const [UnLike] = useUnLikeMutation();
    const [data, setData] = useState({
        comment: ''
    });
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {// eslint-disable-next-line
        followerposts?.map(post => {
            setIsLiked({ ...isLiked, [post._id]: followerposts?.likes?.includes(userInfo?._id) });
        })// eslint-disable-next-line
    }, [followerposts, userInfo]);

    
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const Comment = async (id) => {
        await createComment({ data, id }).unwrap()
            .then((payload) => setData({ comment: '' }))
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
    return (
        <div className='w-full h-auto pb-5 bg-white border-b'>
            <div className='flex justify-between mt-3 px-3'>
                <div className='flex'>
                    <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300" src={post?.user?.avatar?.url} alt="" />
                    <div className='ml-2 mt-2'>

                        <span className='text-md font-poppins font-medium'>{post?.user?.username}
                            <p className='font-light text-xs my-3 inline mx-2 text-gray-500'>. {moment(post?.createdAt).from()}</p>
                        </span>
                        <p className='font-then text-sm'>{post?.location}</p>
                    </div>

                </div>
                <button onClick={() => dispatch(FeatureAction.Show_isPostMore(true))} className='hover:text-gray-500'>
                    <BsThreeDots size={22} />
                </button>
            </div>
            <div className='mt-3'>
                <img className='rounded-md' src={post?.images[0]?.url} alt=''></img>
            </div>
            <div className='flex justify-between mt-4 px-4 text-2xl'>
                <div className='flex gap-4'>
                    {/* {post && post?.likes.some(userInfo?._id) ?
                  <p>true</p> : <p>False</p>} */}
                    {isLiked[post?._id] ?
                        <button onClick={() => UnLikeSubmit(post?._id)} className='hover:text-gray-500 text-red-500'>
                            <FaHeart style={{ color: 'red' }} />
                        </button> :
                        <button onClick={() => LikeSubmit(post?._id)} className='hover:text-gray-500'>
                            <FaRegHeart />
                        </button>}

                    {MobileView ? <Link
                        to={`/p/${post?._id}`}
                        className='cursor-pointer hover:text-gray-500'>
                        <FaRegComment />
                    </Link>
                        :
                        <div
                            onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(post?._id) }}
                            className='cursor-pointer hover:text-gray-500'>
                            <FaRegComment />
                        </div>}


                    <button className='hover:text-gray-500 cursor-pointer'><IoMdPaperPlane /></button>
                </div>
                <button onClick={() => SaveSubmit(postID)} className='hover:text-gray-500 cursor-pointer'><BsBookmarkCheck /></button>
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
            <form onSubmit={(e) => Comment(post?._id, e.preventDefault())} className='flex px-3 mt-2'>
                <input onChange={handleChange} name='comment' value={data.comment} autoComplete='off' className='outline-none w-full pr-3' placeholder='Add Comment ...' />
                <div className='flex gap-2'>
                    {data.comment && <button type='submit' className='text-blue-500 focus:text-blue-400 font-semibold ml-auto'>Post</button>}
                    <div className='text-2xl text-gray-600 pl-1 pr-2 cursor-pointer'><FaRegSmile /></div>
                </div>
            </form>
        </div>
    )
}

export default SinglePost
