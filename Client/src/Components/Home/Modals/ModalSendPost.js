import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from './../../../Animation/AnimModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ChatApi, useUserChatsQuery } from '../../../Redux/APIs/ChatApi';
import { useEffect, useState } from 'react';
import FollowerCart from '../../Messenger/FollowerCart';
import { useNewMessageMutation } from '../../../Redux/APIs/MessageApi';
import { useSocket } from '../../Exports';

const ModalSendPost = ({ PostId }) => {
  const dispatch = useDispatch();
  const Website = process.env.REACT_APP_Website
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { data, isError, isFetching, error } = useUserChatsQuery(1, {
    // refetchOnMountOrArgChange: true
  });
  const { Chats, totalCount } = data || {};
  const [MewMessage] = useNewMessageMutation() || {};
  const [msg, setMSG] = useState(`${Website}/p/${PostId}`);
  const { isShare } = useSelector(state => state.Features);

  const { socket } = useSocket();

  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (totalCount === 0) {
      setHasMore(false);
    }
  }, [totalCount, page]);

  useEffect(() => {
    if (page > 1) {
      dispatch(
        ChatApi.endpoints.getMoreChats.initiate({
          page
        })
      );
    }
  }, [page, dispatch]);

  const SendPost = (userById, id) => {

    const data = { msg }
    MewMessage({ data, id }).unwrap()
      .then(payload => {
        setMSG('')
        dispatch(FeatureAction.setIsClipAlert(true))
        socket.emit("Message", {
          sender: payload.sender,
          msg: payload.msg,
          createdAt: payload.createdAt,
          image: payload.image,
          chatId: payload.chatId,
          receiver: userById?._id
        });
      })
      .catch(err => console.log(err))
  }
  return (

    <>
      <div onClick={() => {
        dispatch(FeatureAction.setIsShare(false));
        isShare && dispatch(FeatureAction.setIsClipAlert(true))
      }} className="fixed inset-0 bg-black/30 z-20"></div>
      <motion.div
        variants={AnimModal}
        initial='initial'
        animate='animate'
        exit='exit'
        className='fixed inset-x-0 h-[30rem] lg:h-[40rem] space-y-5 top-[13%] container px-0 max-w-xs sm:max-w-[30rem] z-30 bg-white w-full rounded-xl shadow drop-shadow-xl '
      >
        <div className='flex justify-center items-center font-semibold text-xl py-3'>Share</div><hr className='!mt-0' />
        {isFetching ?
          <div>

          </div> : isError ? <p>{error?.data?.msg}</p> :
            <InfiniteScroll
              dataLength={Chats.length}
              next={fetchMore}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              className='overflow-y-scroll !h-full hideScrollBare -mt-5 '
            >
              {Chats?.map(chat => (
                <div key={chat?._id}>
                  <FollowerCart chat={chat} SendPost={SendPost} />
                </div>
              ))}
            </InfiniteScroll>
        }
      </motion.div>
    </>
  )
}

export default ModalSendPost
