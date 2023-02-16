import { useDispatch, useSelector } from 'react-redux';
import { useGetFollowersPostsQuery } from '../../../Redux/APIs/PostsApi';
import { PostMore, ModalPostDetails, SinglePost, ModalReports, ModalThanksReport, ModalUnFollowConfirm, ModalBlockConfirm, ModalPostMoreLogged } from '../../Exports';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ClipAlerts } from '../../Layouts/Alerts';
import { setTotalPosts } from '../../../Redux/Slices/PostsSlice';
const Posts = () => {
  const dispatch = useDispatch();
  const {
    isModalPostDetails, isPostMore, isClipAlert, isModalReports,
    isModalThanksReport, isModalUnfollowConfirm, isModalBlockConfirm, isModalPostMoreLogged
  } = useSelector(state => state.Features);

  const [page, setPage] = useState(1);
  const [postID, setPostID] = useState('');
  const [postDetails, setPostDetails] = useState('');
  const { posts } = useSelector(state => state.Posts)

  const { data: followerposts, isFetching, error, isError } = useGetFollowersPostsQuery(page) || {};
  useEffect(() => {
    dispatch(setTotalPosts(followerposts))
  }, [followerposts, dispatch]);


  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);


  return (
    <>
      <AnimatePresence>
        {isClipAlert && <ClipAlerts />}
      </AnimatePresence>
      <AnimatePresence>
        {isModalPostDetails && <ModalPostDetails ID={postID} postDetails={postDetails} />}
      </AnimatePresence>
      {isModalReports && <ModalReports />}
      {isModalThanksReport && <ModalThanksReport postDetails={postDetails} />}
      {isModalUnfollowConfirm && <ModalUnFollowConfirm postDetails={postDetails} />}
      {isModalBlockConfirm && <ModalBlockConfirm UserByIdDetails={postDetails?.user} />}
      {isPostMore && <PostMore onClose={() => dispatch(FeatureAction.Show_isPostMore(false))} PostId={postID} postDetails={postDetails} />}
      {isModalPostMoreLogged && <ModalPostMoreLogged PostId={postID} postDetails={postDetails} />}
      {isFetching ? <div></div> : isError ? <p>{error?.data?.msg}</p> :
        posts?.map(post => (
          <div key={post?._id} className='mt-4 container max-w-[25rem] xsm:max-w-[28rem] sm:max-w-xl px-0'>
            <SinglePost postDetail={post} setTotalPosts={setTotalPosts} postID={postID} setPostID={setPostID} setPostDetails={setPostDetails} />
          </div>
        ))}
    </>
  )
}

export default Posts
