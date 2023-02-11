import { useDispatch, useSelector } from 'react-redux';
import { useGetFollowersPostsQuery } from '../../../Redux/APIs/PostsApi';
import { PostMore, ModalPostDetails, SinglePost } from '../../Exports';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ClipAlerts } from '../../Layouts/Alerts';
const Posts = () => {
  const dispatch = useDispatch();
  const { isModalPostDetails, isPostMore, isClipAlert } = useSelector(state => state.Features);
  const { data: followerposts, isFetching, error, isError } = useGetFollowersPostsQuery() || {};
  const [postID, setPostID] = useState('');
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isModalPostDetails ? 'hidden' : 'auto';
  }, [isModalPostDetails]);
  return (
    <>
      <AnimatePresence>
        {isClipAlert && <ClipAlerts />}
      </AnimatePresence>
      <AnimatePresence>
        {isModalPostDetails && <ModalPostDetails ID={postID} />}
      </AnimatePresence>
      {isPostMore && <PostMore onClose={() => dispatch(FeatureAction.Show_isPostMore(false))} PostId={postID} />}
      {isFetching ? <div></div> : isError ? <p>{error?.data?.msg}</p> :
        followerposts?.map(post => (
          <div key={post?._id} className='mt-4 container max-w-[22rem] xsm:max-w-[28rem] sm:max-w-xl px-0'>
            <SinglePost post={post} postID={postID} setPostID={setPostID} />
          </div>
        ))}
    </>
  )
}

export default Posts
