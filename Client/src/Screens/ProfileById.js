import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
    SideBar, useTitle, Footer, UsersTagesById,
    UserReelsById, UsersPostsById, ModalUserByIdSettings,
    ModalFollowing, ModalFollowers, ModalFollowerCTRL
} from '../Components/Exports'
import { BsBookmarks, BsThreeDots, BsGrid, BsPersonLinesFill } from 'react-icons/bs';
import { useState } from 'react';
import { FeatureAction } from '../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
import { useFollowMutation, useGetUserByIdQuery, useGetUserQuery } from '../Redux/APIs/UserApi';
import { BiChevronDown } from 'react-icons/bi';
import { IoPersonAddOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useNewChatMutation } from '../Redux/APIs/ChatApi';
import { ImSpinner3 } from 'react-icons/im';

const Profile = () => {

    const { username } = useParams();
    const { data: userInfo, isError, isFetching, error } = useGetUserByIdQuery(username) || {};
    // const { data: getfollowerchatID } = useSingleChatQuery(id) || {};
    const { isModalFollowersList, isModalFollowingList, isModalFollowerCTRL } = useSelector(state => state.Features);
    useTitle(userInfo?.fullname);
    const navigate = useNavigate();
    const { data: loggeduser } = useGetUserQuery() || {};
    const [Follow] = useFollowMutation() || {};
    const [NewChat, { isFetching: Loading }] = useNewChatMutation() || {};

    const dispatch = useDispatch();
    const [isFollowing, setIsFollowing] = useState(false);
    const [posts, setPosts] = useState(true);
    const [saved, setSaved] = useState(false);
    const [tagged, setTaged] = useState(false);
    const FollowUser = () => {
        const id = userInfo._id
        Follow(id).unwrap()
            .catch(err => console.log(err))
    };
    const NewChatifNot = () => {
        const id = userInfo?._id
        NewChat(id).unwrap()
            .then(payload => navigate(`message/${payload}`))
            .catch(err => console.log(err))
    }

    useEffect(() => {// eslint-disable-next-line
        const isInclude = userInfo?.followers?.some(p => p == loggeduser?._id);
        isInclude ? setIsFollowing(true) : setIsFollowing(false);
    }, [loggeduser, setIsFollowing, userInfo]);

    const OpenPosts = () => {
        setPosts(true); setSaved(false); setTaged(false);
    }
    const OpenSaved = () => {
        setPosts(false); setSaved(true); setTaged(false);
    }
    const OpenTaged = () => {
        setPosts(false); setSaved(false); setTaged(true);
    }
    return (
        <div className='bg-white'>
            <SideBar />
            {isModalFollowingList && <ModalFollowing id={userInfo?._id} />}
            {isModalFollowersList && <ModalFollowers id={userInfo?._id} />}
            {isModalFollowerCTRL && <ModalFollowerCTRL userInfo={userInfo} />}
            <ModalUserByIdSettings />
            {isFetching ?
                <div>
                    {/* Animation Loading Her  */}
                </div>
                : isError && <p>{error?.data?.msg}</p>}
            <div className='container px-0 max-w-[85rem] pt-14 lg:mt-0 mt-5'>
                <div className='container px-.5 max-w-[70rem] px-0 '>
                    <div className='flex gap-3 sm:gap-24 justify-center items-center mb-8'>
                        <img className='w-40 h-40 lg:w-48 lg:h-48 rounded-full col-span-2 flex justify-center items-center' src={userInfo?.avatar?.url} alt='' />
                        <div className='col-span-4 md:col-span-5 flex justify-start mt-10'>
                            <div className='space-y-5'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-lg font-semibold'>{userInfo?.fullname}</p>
                                    <button onClick={() => dispatch(FeatureAction.Show_iSModalSittings(true))}><BsThreeDots size={24} /></button>
                                </div>
                                <div className='flex gap-3'>
                                    {isFollowing ?
                                        <>
                                            <button
                                                onClick={() => dispatch(FeatureAction.setIsModalFollowerCTRL(false))}
                                                className='bg-gray-100 font-medium rounded-md flex items-center px-2 py-2 gap-2 hover:bg-gray-200'>Following <BiChevronDown size={22} />
                                            </button>
                                            <Link
                                                onClick={NewChatifNot}
                                                // to={`message/${getfollowerchatID?._id}`}
                                                className='bg-gray-100 font-medium rounded-md flex items-center px-3 py-2 gap-2 hover:bg-gray-200'>
                                                {Loading ?
                                                    <div>
                                                        <ImSpinner3 />
                                                    </div> :
                                                    'Message'
                                                }</Link>
                                        </>
                                        :
                                        <>
                                            <button onClick={FollowUser} className='bg-blue-500 text-white font-medium rounded-md flex items-center px-6 py-2 gap-2'>Follow</button>
                                            <button className='bg-gray-200 font-medium rounded-md flex items-center px-3 py-2 gap-2'><IoPersonAddOutline size={22} /></button>
                                        </>
                                    }
                                </div>
                                <div className='hidden lg:flex gap-5 whitespace-nowrap'>
                                    <span className='text-lg font-mono'>{userInfo?.posts?.length} posts</span>
                                    <button onClick={() => dispatch(FeatureAction.setIsModalFollowersList(true))} className='text-lg font-mono'>{userInfo?.followers?.length} follower</button>
                                    <button onClick={() => dispatch(FeatureAction.setIsModalFollowingList(true))} className='text-lg font-mono'>{userInfo?.following?.length} following</button>
                                </div>
                                <p className='text-lg font-semibold'>{userInfo?.username}</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid lg:hidden grid-cols-3 gap-5 text-center whitespace-nowrap border-t py-2'>
                        <span className='text-lg font-mono'>
                            <p>{userInfo?.posts?.length || 0}</p>
                            <p className='text-gray-500'>posts</p>
                        </span>
                        <button onClick={() => dispatch(FeatureAction.setIsModalFollowersList(true))}>
                            <p className='text-lg font-mono'>{userInfo?.followers?.length}</p>
                            <p className='text-gray-500'>follower</p>
                        </button>
                        <button onClick={() => dispatch(FeatureAction.setIsModalFollowingList(true))}>
                            <p className='text-lg font-mono'>{userInfo?.following?.length}</p>
                            <p className='text-gray-500'>following</p>
                        </button>
                    </div>
                </div><hr className='bg-black/60' />
                <div className='conatiner max-w-[85rem]'>
                    <div className='flex gap-14 justify-center items-center'>
                        <div onClick={OpenPosts} className={posts ? 'profileitems !text-black border-t border-black' : 'profileitems'}>
                            <BsGrid />
                            <p>Posts</p>
                        </div>
                        <div onClick={OpenSaved} className={saved ? 'profileitems !text-black border-t border-black' : 'profileitems'}>
                            <BsBookmarks />
                            <p>Reels</p>
                        </div>
                        <div onClick={OpenTaged} className={tagged ? 'profileitems !text-black border-t border-black' : 'profileitems'}>
                            <BsPersonLinesFill />
                            <p>Tagged</p>
                        </div>
                    </div>
                </div>
                {(posts && !isFetching) && <UsersPostsById ID={userInfo?._id} userInfo={userInfo} />}
                {saved && <UserReelsById />}
                {tagged && <UsersTagesById />}
            </div>
            <div className='mt-40'>
                <Footer />
            </div>
        </div>
    )
}

export default Profile
