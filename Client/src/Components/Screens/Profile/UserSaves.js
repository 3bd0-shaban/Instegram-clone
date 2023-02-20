import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react'
import { BsBookmarks, BsFillChatFill } from 'react-icons/bs'
import { ImSpinner3 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetSaveQuery } from '../../../Redux/APIs/SavesApi';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import {
    ModalPostDetails, useBreakpoint, PostMore, ModalPostMoreLogged,
    ModalUnFollowConfirm, ModalReports, ModalThanksReport, ModalBlockConfirm
} from '../../Exports';

const UserSaves = ({ userInfo }) => {
    const { data: usersaves, isFetching, error, isError } = useGetSaveQuery() || {};
    const { isModalPostDetails, isModalPostMoreLogged, isPostMore,
        isModalReports, isModalBlockConfirm, isModalUnfollowConfirm, isModalThanksReport } = useSelector(state => state.Features);
    const dispatch = useDispatch()
    const [postID, setPostID] = useState('');
    const breakpoint = useBreakpoint();
    const MobileView = (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg');
    const navigate = useNavigate();
    const [postDetails, setPostDetails] = useState('');
    const EmptyTagges = () => {
        return (
            <>
                <div className='flex mt-28 justify-center'>
                    <div className='border-black border-[3px] flex items-center rounded-full p-5'>
                        <BsBookmarks size={40} />
                    </div>
                </div>
                <div className='my-8'>
                    <div className='block text-center space-y-5'>
                        <p>Only you can see what you've saved.</p>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <AnimatePresence>
                {isModalPostDetails && <ModalPostDetails ID={postID} postDetails={postDetails} />}
            </AnimatePresence>
            {isModalReports && <ModalReports />}
            {isModalThanksReport && <ModalThanksReport postDetails={postDetails} />}
            {isModalUnfollowConfirm && <ModalUnFollowConfirm postDetails={postDetails} />}
            {isModalBlockConfirm && <ModalBlockConfirm UserByIdDetails={postDetails?.user} />}
            {isPostMore && <PostMore onClose={() => dispatch(FeatureAction.Show_isPostMore(false))} PostId={postID} postDetails={postDetails} />}
            {isModalPostMoreLogged && <ModalPostMoreLogged PostId={postID} postDetails={postDetails} />}
            <div className='container max-w-6xl px-0'>
                {isError && <p>{error?.data?.msg}</p>}
                {isFetching && <p className='flex justify-center items-center text-3xl font-medium h-full animate-spin'><ImSpinner3 /></p>}
                {(usersaves?.saves === [] || !usersaves || usersaves?.saves?.length === 0) && <EmptyTagges />}
                <div className='grid grid-cols-3 gap-2 lg:gap-8 mt-7'>
                    {usersaves?.saves?.map((item, index) => (
                        <div onClick={() => {
                            MobileView ?
                                navigate(`/p/${item?._id}?profile=${userInfo.username}`)
                                :
                                dispatch(FeatureAction.Show_ModalPostDetails(true)); setPostID(item?._id); setPostDetails(item)
                        }}
                            key={item?._id}
                            className='h-40 md:h-80 cursor-pointer hover:brightness-50 duration-200 group relative'
                        >                            <img className='object-cover w-full h-full' src={item?.images[0]?.url} alt='' />
                            <div className='absolute inset-1/2 left-[45%] z-10 gap-3 items-center text-white font-bold hidden group-hover:flex'>
                                <div><BsFillChatFill size={25} /></div>
                                <p className='inline-block'>0</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default UserSaves
