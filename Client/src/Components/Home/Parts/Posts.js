import { useDispatch, useSelector } from 'react-redux';
import { useGetFollowersPostsQuery } from '../../../Redux/APIs/PostsApi';
import { PostMore, ModalPostDetails, SinglePost } from '../../Exports';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
const Posts = () => {
  const dispatch = useDispatch();
  const { isModalPostDetails } = useSelector(state => state.Features);
  const { data: followerposts, isFetching, error, isError } = useGetFollowersPostsQuery() || {};
  const [postID, setPostID] = useState('');
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isModalPostDetails ? 'hidden' : 'auto';
  }, [isModalPostDetails]);

  return (
    <>
      <AnimatePresence>
        {isModalPostDetails && <ModalPostDetails ID={postID} />}
      </AnimatePresence>
      <PostMore onClose={() => dispatch(FeatureAction.Show_isPostMore(false))} />
      {isFetching ? <div></div> : isError ? <p>{error?.data?.msg}</p> :
        followerposts?.map(post => (
          <div key={post?._id} className='mt-4'>
            <SinglePost post={post} postID={postID} setPostID={setPostID} />
          </div>
        ))}
    </>
  )
}

export default Posts
