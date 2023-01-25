import { useDispatch } from 'react-redux';
import { useGetFollowersPostsQuery } from '../../../Redux/APIs/PostsApi';
import { PostMore, ModalPostDetails } from '../../Exports';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import { useEffect, useState } from 'react';
import { useGetUserQuery } from '../../../Redux/APIs/AuthApi';
import { useCreateCommentMutation, useLikeMutation, useUnLikeMutation } from '../../../Redux/APIs/CommentsApi';
import { useSaveMutation } from '../../../Redux/APIs/SavesApi';
import { BsBookmarkCheck, BsThreeDotsVertical } from 'react-icons/bs';
import { FaHeart, FaRegComment, FaRegHeart, FaRegSmile } from 'react-icons/fa';
import { IoMdPaperPlane } from 'react-icons/io';
import moment from 'moment';
import { Link } from 'react-router-dom';


const Posts = () => {
  const dispatch = useDispatch();
  const { data: followerposts, isFeatching, error, isError } = useGetFollowersPostsQuery() || {};
  const [postID, setPostID] = useState('');
  const [createComment] = useCreateCommentMutation();
  const { data: userInfo } = useGetUserQuery() || {};
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
      // console.log(isLiked)
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
  // console.log(isLiked)
  return (
    <>
      <ModalPostDetails ID={postID} />
      <PostMore onClose={() => dispatch(FeatureAction.Show_isPostMore(false))} />
      {isFeatching ? <div></div> : isError ? <p>{error?.data?.msg}</p> :
        followerposts?.map(post => (

          <div key={post?._id} className='mt-4'>
            <div className='w-full h-auto pb-5 bg-white rounded-lg border'>
              <div className='flex justify-between mt-3 px-3'>
                <div className='flex'>
                  <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300" src={post?.user?.avatar?.url} alt="" />
                  <div className='ml-2 mt-2'>
                    <p className='text-md font-poppins font-medium'>{post?.user?.username}</p>
                    <p className='font-then text-sm'>{post?.location}</p>
                  </div>
                </div>
                <button onClick={() => dispatch(FeatureAction.Show_isPostMore(true))} className='mr-2 py-0 h-1 mt-2 hover:text-gray-500'>
                  <BsThreeDotsVertical />
                </button>
              </div>
              <div className='mt-3'>
                <img className='' src={post?.images[0]?.url} alt=''></img>
              </div>
              <div className='flex justify-between mt-4 px-4 text-2xl'>
                <div className='flex gap-4'>
                  {/* {post && post?.likes.some(userInfo?._id) ?
                  <p>true</p> : <p>False</p>} */}
                  {isLiked[post?._id] ? <button onClick={() => UnLikeSubmit(post?._id)} className='hover:text-gray-500 text-red-500'><FaHeart style={{color:'red'}} /></button> :
                    <button onClick={() => LikeSubmit(post?._id)} className='hover:text-gray-500'><FaRegHeart /></button>}

                  <div onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(post?._id) }} className='cursor-pointer focus:animate-bounce hover:text-gray-500'>
                    <FaRegComment />
                  </div>
                  <button className='hover:text-gray-500 cursor-pointer'><IoMdPaperPlane /></button>
                </div>
                <button onClick={() => SaveSubmit(postID)} className='hover:text-gray-500 cursor-pointer'><BsBookmarkCheck /></button>
              </div>
              <div className='ml-4 mt-4'>
                <p className='text-md font-semibold'>{post?.numLikes} Likes</p>
                <Link className='font-bold mr-2'>emilia clark</Link>
                <p className=' inline font-semilight'>{post?.des}</p>
                <Link onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(post?._id) }} className='block text-gray-500 font-lg font-extralight'>View all {post?.numComments} comments</Link>
                <p className='font-light text-sm my-3 text-gray-500'>{moment(post?.createdAt).from()}</p>
              </div>
              <form onSubmit={(e) => Comment(post?._id, e.preventDefault())} className='flex px-3 border-t pt-3 mt-2'>
                    <div className='text-2xl pl-1 pr-2 cursor-pointer'><FaRegSmile /></div>
                    <input onChange={handleChange} name='comment' value={data.comment} autoComplete='off' className='outline-none w-full pr-3' placeholder='Add Comment ...' />
                    <button type='submit' className='text-blue-500 focus:text-blue-400 font-semibold ml-auto'>Post</button>
                </form>
            </div>
          </div>
        ))}
    </>
  )
}

export default Posts
