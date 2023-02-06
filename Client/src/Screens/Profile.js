import React from 'react'
import { Link } from 'react-router-dom'
import { SideBar, useTitle, UserSaves, UsersPosts, UsersTages, Footer, ModalSittings, ModalFollowers, ModalFollowing } from '../Components/Exports'
import { BsBookmarks, BsGear, BsGrid, BsPersonLinesFill } from 'react-icons/bs';
import { useState } from 'react';
import { FeatureAction } from '../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
import { useGetUserQuery } from '../Redux/APIs/UserApi';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { data: userInfo, isError, isFetching, error } = useGetUserQuery() || {};
    const { isModalFollowersList, isModalFollowingList } = useSelector(state => state.Features);
    useTitle(userInfo?.fullname);
    const dispatch = useDispatch();
    const [posts, setPosts] = useState(true);
    const [saved, setSaved] = useState(false);
    const [tagged, setTaged] = useState(false);

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
            <ModalSittings />
            {isFetching ? <div>
                {/* Animation Loading Her  */}
            </div>
                : isError && <p>{error?.data?.msg}</p>}
            <div className='container px-0 max-w-[85rem] pt-14 lg:mt-0 xl:mr-0 xxxl:mr-60'>
                <div className='container px-.5 max-w-[70rem] px-0'>
                    <div className='grid grid-cols-6 md:grid-cols-7 gap-3 mb-8'>
                        <img className='h-60 max-w-60 rounded-full col-span-2  flex justify-center items-center' src={userInfo?.avatar?.url} alt='' />
                        <div className='col-span-4 md:col-span-5 flex justify-start mt-10'>
                            <div className='space-y-5'>
                                <div className='flex items-center gap-6'>
                                    <p className='text-xl font-semibold'>{userInfo?.fullname}</p>
                                    <Link to='/settings/edit' className='bg-[#DBDBDB] font-medium rounded-md flex items-center px-3 py-2 focus:bg-gray-300'>Edit Profile</Link>
                                    <button onClick={() => dispatch(FeatureAction.Show_iSModalSittings(true))}><BsGear size={24} /></button>
                                </div>
                                <div className='flex gap-5'>
                                    <span className='text-lg font-mono'>{userInfo?.posts?.length} posts</span>
                                    <button onClick={() => dispatch(FeatureAction.setIsModalFollowersList(true))} className='text-lg font-mono'>{userInfo?.followers?.length} follower</button>
                                    <button onClick={() => dispatch(FeatureAction.setIsModalFollowingList(true))} className='text-lg font-mono'>{userInfo?.following?.length} following</button>
                                </div>
                                <p className='text-lg font-semibold'>{userInfo?.username}</p>
                            </div>
                        </div>
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
                            <p>Saved</p>
                        </div>
                        <div onClick={OpenTaged} className={tagged ? 'profileitems !text-black border-t border-black' : 'profileitems'}>
                            <BsPersonLinesFill />
                            <p>Tagged</p>
                        </div>
                    </div>
                </div>
                {posts && <UsersPosts />}
                {saved && <UserSaves />}
                {tagged && <UsersTages />}
            </div>
            <div className='mt-40'>
                <Footer />
            </div>
        </div>
    )
}

export default Profile
