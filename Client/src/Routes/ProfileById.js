import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
    SideBar, useTitle, Footer, UsersTagesById,
    UserReelsById, UsersPostsById, ModalUserByIdSettings,
    ModalFollowing, ModalFollowers, ModalFollowerCTRL, SkilProfileById
} from '../Components/Exports'
import { BsBookmarks, BsThreeDots, BsGrid, BsPersonLinesFill } from 'react-icons/bs';
import { useState } from 'react';
import { FeatureAction } from '../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
import {
    useCancelFollowRequestMutation, useFollowMutation,
    useFollowPrivateMutation, useGetUserByIdQuery,
} from '../Redux/APIs/UserApi';
import { BiChevronDown } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNewChatMutation } from '../Redux/APIs/ChatApi';
import { ImSpinner3 } from 'react-icons/im';
import { selectCurrentUser } from '../Redux/Slices/UserSlice';
import NotFounded from '../Utils/NotFounded';

const Profile = () => {

    const { username } = useParams();
    const { data: userById, isError, isFetching, error } = useGetUserByIdQuery(username) || {};
    // const { data: getfollowerchatID } = useSingleChatQuery(id) || {};
    const { isModalFollowersList, isModalFollowingList, isModalFollowerCTRL, isModalSettings } = useSelector(state => state.Features);
    useTitle(userById?.username);
    const navigate = useNavigate();
    const userInfo = useSelector(selectCurrentUser)
    const [Follow, { isLoading }] = useFollowMutation() || {};
    const [FollowPrivate, { isLoading: loadingprivate }] = useFollowPrivateMutation() || {};
    const [CancelFollowRequest, { isLoading: loadingcancel }] = useCancelFollowRequestMutation() || {};
    const [NewChat, { isLoading: loadChat }] = useNewChatMutation() || {};

    const dispatch = useDispatch();
    const [bending, setIsBending] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const location = useLocation();
    const posts = (location.search === `?posts` || location.search === ``)
    const Reels = (location.search === `?reels`)
    const tagged = (location.search === `?tages`)
    const id = userById?._id
    const FollowUser = () => {
        Follow(id).unwrap()
            .catch(err => console.log(err))
    };
    const FollowPrivateHandler = () => {
        FollowPrivate(id).unwrap()
            .catch(err => console.log(err))
    };
    const CancelFollowRequestHandelr = () => {
        CancelFollowRequest(id).unwrap()
            .catch(err => console.log(err))
    };
    const NewChatifNot = () => {
        const id = userById?._id
        NewChat(id).unwrap()
            .then(payload => navigate(`message/${payload}`))
            .catch(err => console.log(err))
    }

    useEffect(() => {// eslint-disable-next-line
        const isInclude = userById?.followers?.some(p => p == userInfo?._id);
        isInclude ? setIsFollowing(true) : setIsFollowing(false);
    }, [userInfo, setIsFollowing, userById]);

    useEffect(() => {// eslint-disable-next-line
        const isInclude = userById?.bendingRequests?.some(p => p == userInfo?._id);
        isInclude ? setIsBending(true) : setIsBending(false);
    }, [userInfo, setIsBending, userById]);
    return (
        <div className='bg-white'>
            <SideBar />
            {isModalFollowingList && <ModalFollowing id={userById?._id} />}
            {isModalFollowersList && <ModalFollowers id={userById?._id} />}
            {isModalFollowerCTRL && <ModalFollowerCTRL userInfo={userById} />}
            {isModalSettings && <ModalUserByIdSettings id={userById?._id} />}
            {isFetching ?
                <SkilProfileById />
                : isError ? <NotFounded /> :
                    <div className='container px-0 max-w-[85rem] pt-14 lg:mt-0 mt-5'>
                        <div className='container px-.5 max-w-[70rem] px-0 '>
                            <div className='flex px-2 gap-3 sm:gap-24 lg:justify-center items-center mb-8'>
                                <img className='w-40 h-40 lg:w-48 lg:h-48 rounded-full col-span-2 flex justify-center items-center object-cover'
                                    src={userById?.avatar?.url ? userById?.avatar?.url : process.env.REACT_APP_DefaultIcon} alt='' />
                                <div className='col-span-4 md:col-span-5 flex justify-start mt-10'>
                                    <div className='space-y-5'>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-lg font-semibold'>{userById?.fullname}</p>
                                            <button onClick={() => dispatch(FeatureAction.Show_iSModalSittings(true))}><BsThreeDots size={24} /></button>
                                        </div>
                                        <div className='flex gap-3'>
                                            {isFollowing ?
                                                <>
                                                    <button
                                                        onClick={() => dispatch(FeatureAction.setIsModalFollowerCTRL(false))}
                                                        className='bg-gray-100 font-medium rounded-md flex items-center px-2 py-2 gap-2 hover:bg-gray-200'>Following
                                                        <BiChevronDown size={22} />
                                                    </button>
                                                    <Link
                                                        onClick={NewChatifNot}
                                                        // to={`message/${getfollowerchatID?._id}`}
                                                        className='bg-gray-100 font-medium rounded-md flex items-center px-3 py-2 gap-2 hover:bg-gray-200'>
                                                        {loadChat ?
                                                            <div className='flex justify-center items-center px-3 animate-spin'>
                                                                <ImSpinner3 />
                                                            </div> :
                                                            'Message'
                                                        }</Link>
                                                </>
                                                : bending ?
                                                    <>
                                                        <button onClick={CancelFollowRequestHandelr}
                                                            disabled={loadingcancel} className='bg-gray-100 text-black font-medium rounded-md flex items-center px-6 py-2 gap-2'>
                                                            {loadingcancel
                                                                ?
                                                                <span className='flex justify-center items-center px-6 animate-spin'>
                                                                    <ImSpinner3 size={25} /></span> : 'Cancel Request'}
                                                        </button>
                                                        {/* <button className='bg-gray-200 font-medium rounded-md flex items-center px-3 py-2 gap-2'><IoPersonAddOutline size={22} /></button> */}
                                                    </>
                                                    :
                                                    <>
                                                        <button onClick={userById?.isprivat ? FollowPrivateHandler : FollowUser}
                                                            disabled={isLoading || loadingprivate}
                                                            className='bg-blue-500 text-white font-medium rounded-md flex items-center px-6 py-2 gap-2'>
                                                            {(isLoading || loadingprivate) ?
                                                                <span className='flex justify-center items-center px-6 animate-spin'>
                                                                    <ImSpinner3 size={25} /></span>
                                                                : 'Follow'}
                                                        </button>
                                                    </>
                                            }
                                        </div>
                                        <div className='hidden lg:flex gap-5 whitespace-nowrap'>
                                            <span className='text-lg font-mono'>{userById?.posts?.length} posts</span>
                                            <button onClick={() => dispatch(FeatureAction.setIsModalFollowersList(true))} className='text-lg font-mono'>
                                                {userById?.followers?.length} follower
                                            </button>
                                            <button onClick={() => dispatch(FeatureAction.setIsModalFollowingList(true))} className='text-lg font-mono'>
                                                {userById?.following?.length} following
                                            </button>
                                        </div>
                                        <p className='text-lg font-semibold'>{userById?.username}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='grid lg:hidden grid-cols-3 gap-5 text-center whitespace-nowrap border-t py-2'>
                                <span className='text-lg font-mono'>
                                    <p>{userById?.posts?.length || 0}</p>
                                    <p className='text-gray-500'>posts</p>
                                </span>
                                <button onClick={() => dispatch(FeatureAction.setIsModalFollowersList(true))}>
                                    <p className='text-lg font-mono'>{userById?.followers?.length}</p>
                                    <p className='text-gray-500'>follower</p>
                                </button>
                                <button onClick={() => dispatch(FeatureAction.setIsModalFollowingList(true))}>
                                    <p className='text-lg font-mono'>{userById?.following?.length}</p>
                                    <p className='text-gray-500'>following</p>
                                </button>
                            </div>
                        </div><hr className='bg-black/60' />
                        <div className='conatiner max-w-[85rem]'>
                            <div className='flex gap-14 justify-center items-center'>
                                <Link to='?posts' className={posts ? 'profileitems !text-black border-t border-black' : 'profileitems'}>
                                    <BsGrid />
                                    <p>Posts</p>
                                </Link>
                                <Link to='?reels' className={Reels ? 'profileitems !text-black border-t border-black' : 'profileitems'}>
                                    <BsBookmarks />
                                    <p>Reels</p>
                                </Link>
                                <Link to='?tages' className={tagged ? 'profileitems !text-black border-t border-black' : 'profileitems'}>
                                    <BsPersonLinesFill />
                                    <p>Tagged</p>
                                </Link>
                            </div>
                        </div>
                        {(posts && !isFetching) && <UsersPostsById id={userById?._id} userById={userById} />}
                        {Reels && <UserReelsById id={userById?._id} userById={userById} />}
                        {tagged && <UsersTagesById />}
                    </div>
            }
            {(error?.status === 404 || error?.status === 500) && <NotFounded />}
            <div className='mt-40'>
                <Footer />
            </div>
        </div>
    )
}

export default Profile
