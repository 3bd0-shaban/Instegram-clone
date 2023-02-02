import { useDispatch } from 'react-redux';
import { useGetFollowersPostsQuery } from '../../../Redux/APIs/PostsApi';
import { PostMore, ModalPostDetails, SinglePost } from '../../Exports';
import { FeatureAction } from './../../../Redux/Slices/FeaturesSlice';
import {  useState } from 'react';

const Posts = () => {
  const dispatch = useDispatch();
  const { data: followerposts, isFeatching, error, isError } = useGetFollowersPostsQuery() || {};
  const [postID, setPostID] = useState('');


  return (
    <>
      <ModalPostDetails ID={postID} />
      <PostMore onClose={() => dispatch(FeatureAction.Show_isPostMore(false))} />
      {isFeatching ? <div></div> : isError ? <p>{error?.data?.msg}</p> :
        followerposts?.map(post => (
          <SinglePost post={post} postID={postID} setPostID={setPostID} />
        ))}
    </>
  )
}

export default Posts
