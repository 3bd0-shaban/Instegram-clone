import { useDispatch, useSelector } from 'react-redux';
import { useGetFollowersPostsQuery } from '../../../Redux/APIs/PostsApi';
import { PostMore, ModalPostDetails, SinglePost, ModalReports, ModalThanksReport, ModalUnFollowConfirm } from '../../Exports';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ClipAlerts } from '../../Layouts/Alerts';
const Posts = () => {
  const dispatch = useDispatch();
  const { isModalPostDetails, isPostMore, isClipAlert, isModalReports, isModalThanksReport, isModalUnfollowConfirm } = useSelector(state => state.Features);
  const { data: followerposts, isFetching, error, isError } = useGetFollowersPostsQuery() || {};
  const [postID, setPostID] = useState('');
  const [postDetails, setPostDetails] = useState('');
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
      {isModalReports && <ModalReports />}
      {isModalThanksReport && <ModalThanksReport postDetails={postDetails} />}
      {isModalUnfollowConfirm && <ModalUnFollowConfirm postDetails={postDetails} />}
      {isPostMore && <PostMore onClose={() => dispatch(FeatureAction.Show_isPostMore(false))} PostId={postID} postDetails={postDetails} />}
      {isFetching ? <div></div> : isError ? <p>{error?.data?.msg}</p> :
        followerposts?.map(post => (
          <div key={post?._id} className='mt-4 container max-w-[25rem] xsm:max-w-[28rem] sm:max-w-xl px-0'>
            <SinglePost post={post} postID={postID} setPostID={setPostID} setPostDetails={setPostDetails} />
          </div>
        ))}
    </>
  )
}

export default Posts
