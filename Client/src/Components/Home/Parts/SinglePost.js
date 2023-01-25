import { useEffect, useState } from 'react';
import { BsThreeDots, BsBookmarkCheck } from 'react-icons/bs'
import { FaRegHeart, FaRegComment, FaRegSmile } from 'react-icons/fa'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useGetUserQuery } from '../../../Redux/APIs/AuthApi';
import { useCreateCommentMutation, useLikeMutation, useUnLikeMutation } from '../../../Redux/APIs/CommentsApi';
import { IoMdPaperPlane } from 'react-icons/io';
import { useSaveMutation } from '../../../Redux/APIs/SavesApi';
import { useGetFollowersPostsQuery } from '../../../Redux/APIs/PostsApi';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
const SinglePost = (props) => {
    const [createComment] = useCreateCommentMutation();
    const { data: userInfo } = useGetUserQuery() || {};
    const { data: followerposts } = useGetFollowersPostsQuery() || {};
    const dispatch = useDispatch();

    const [Like] = useLikeMutation();
    const [Save] = useSaveMutation();
    const [UnLike] = useUnLikeMutation();
    const [data, setData] = useState({
        comment: ''
    });
    const [isLiked, setIsLiked] = useState(false)
    useEffect(() => {
        const liked = followerposts?.likes?.include(userInfo?._id)
        if (liked) {
            setIsLiked(true)
        }
        setIsLiked(false)
        console.log(liked)
    }, [followerposts, userInfo]);
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };
    const handelSubmit = async (id) => {
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
    console.log(isLiked)
    return (
        <div key={props.ID} className='mt-4'>
            <div className='w-full h-auto pb-5 bg-white rounded-lg border'>
                <div className='flex justify-between mt-3 px-3'>
                    <div className='flex'>
                        <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300" src={props.Avatar} alt="" />
                        <div className='ml-2 mt-2'>
                            <p className='text-md font-poppins font-medium'>{props.Username}</p>
                            <p className='font-then text-sm'>{props.Location}</p>
                        </div>
                    </div>
                    <button onClick={() => dispatch(FeatureAction.Show_isPostMore(true))} className='mr-2 py-0 h-1 mt-2 hover:text-gray-500'>
                        <BsThreeDots />
                    </button>
                </div>
                <div className='mt-3'>
                    <img className='' src={props.Image} alt=''></img>
                </div>
                <div className='flex justify-between mt-4 px-4 text-2xl'>
                    <div className='flex gap-4'>
                        {/* {post && post?.likes.some(userInfo?._id) ?
                  <p>true</p> : <p>False</p>} */}
                        {isLiked ? <button onClick={() => UnLikeSubmit(props.ID)} className='hover:text-gray-500 bg-red-500 text-red-500'><FaRegHeart /></button> :
                            <button onClick={() => LikeSubmit(props.ID)} className='hover:text-gray-500'><FaRegHeart /></button>}

                        <div onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(true)) }} className='cursor-pointer focus:animate-bounce hover:text-gray-500'>
                            <FaRegComment />
                        </div>
                        <button className='hover:text-gray-500 cursor-pointer'><IoMdPaperPlane /></button>
                    </div>
                    <button onClick={() => SaveSubmit(props.ID)} className='hover:text-gray-500 cursor-pointer'><BsBookmarkCheck /></button>
                </div>
                <div className='ml-4 mt-4'>
                    <p className='text-md font-semibold'>{props.numLikes} Likes</p>
                    <Link className='font-bold mr-2'>emilia clark</Link>
                    <p className=' inline font-semilight'>{props.Des}</p>
                    <Link onClick={() => { dispatch(FeatureAction.Show_ModalPostDetails(true)) }} className='block text-gray-500 font-lg font-extralight'>View all {props.numComments} comments</Link>
                    <p className='font-light text-sm my-3 text-gray-500'>{moment(props.Time).calendar()}</p>
                </div>
                <form onSubmit={(e) => handelSubmit(props.ID, e.preventDefault())} className='flex px-3 border-t pt-3 mt-2'>
                    <div className='text-2xl pl-1 pr-2'><FaRegSmile /></div>
                    <input className='outline-none w-full mr-2' onChange={handleChange} name='comment' value={data.comment} placeholder='Add Comment ...' />
                    <button className='text-blue-500 focus:text-blue-400 font-semibold ml-auto'>Post</button>
                </form>
            </div>
        </div>
    )
}

export default SinglePost
