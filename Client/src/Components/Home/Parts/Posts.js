import { useDispatch, useSelector } from 'react-redux';
import { useGetFollowersPostsQuery, PostsApi } from '../../../Redux/APIs/PostsApi';
import { PostMore, ModalPostDetails, SinglePost, ModalReports, ModalThanksReport, ModalUnFollowConfirm, ModalBlockConfirm, ModalPostMoreLogged, ModalSendPost } from '../../Exports';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ClipAlerts } from '../../Layouts/Alerts';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ImSpinner3 } from 'react-icons/im';
import { preventScroll } from './../../../Helpers/PreventScroll';
const Posts = () => {
  const dispatch = useDispatch();
  const {
    isModalPostDetails, isPostMore, isClipAlert, isModalReports, isShare,
    isModalThanksReport, isModalUnfollowConfirm, isModalBlockConfirm, isModalPostMoreLogged
  } = useSelector(state => state.Features);
  preventScroll(isModalPostDetails || isPostMore || isModalReports ||
    isModalThanksReport || isModalUnfollowConfirm || isModalBlockConfirm || isModalPostMoreLogged)
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [postID, setPostID] = useState('');
  const [postDetails, setPostDetails] = useState('');

  const { data, isFetching, error, isError } = useGetFollowersPostsQuery(1) || {};
  const { followersposts, totalCount } = data || {};

  useEffect(() => {
    if (page > 1) {
      dispatch(
        PostsApi.endpoints.getMoreFollowersPosts.initiate(page)
      );
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (totalCount === 0) {
      setHasMore(false);
    }
  }, [totalCount, page]);

  return (
    <>
      <AnimatePresence>
        {isClipAlert && <ClipAlerts />}
      </AnimatePresence>
      <AnimatePresence>
        {isModalPostDetails && <ModalPostDetails id={postID} postDetails={postDetails} />}
      </AnimatePresence>
      {isModalReports && <ModalReports />}
      {isShare && <ModalSendPost PostId={postID} />}
      {isModalThanksReport && <ModalThanksReport userById={postDetails?.user} />}
      {isModalUnfollowConfirm && <ModalUnFollowConfirm userById={postDetails?.user} />}
      {isModalBlockConfirm && <ModalBlockConfirm UserByIdDetails={postDetails?.user} />}
      {isPostMore && <PostMore onClose={() => dispatch(FeatureAction.Show_isPostMore(false))} PostId={postID} postDetails={postDetails} />}
      {isModalPostMoreLogged && <ModalPostMoreLogged PostId={postID} postDetails={postDetails} onDeleteSuccess={() => { isModalPostDetails && dispatch(FeatureAction.Show_ModalPostDetails(false)) }} />}
      {isFetching ? <div></div> : isError ? <p>{error?.data?.msg}</p> :
        <InfiniteScroll
          dataLength={followersposts.length} //This is important field to render the next data
          next={() => setPage((prevPage) => prevPage + 1)}
          hasMore={hasMore}
          loader={
            <div className='flex justify-centerx items-center my-5 animate-spin'>
              <ImSpinner3 size={25} />
            </div>
          }
          endMessage={
            <div className='flex justify-center my-5 text-lg font-semibold'>
              <p>You see it all</p>
            </div>}
          style={{ marginBottom: '3rem', overflow: 'hidden' }}
        >
          {followersposts?.map(post => (
            <div key={post?._id} className='mt-4 container max-w-[22.5rem] xsm:max-w-[24rem] sm:max-w-xl px-0 '>
              <SinglePost postDetail={post} postID={postID} setPostID={setPostID} setPostDetails={setPostDetails} />
            </div>
          ))}
          {(followersposts?.length === 0) && <p className='w-full text-center font-medium text-lg text-gray-600'>No posts yet , follow users to get posts</p>}
        </InfiniteScroll>
      }
    </>
  )
}

export default Posts
