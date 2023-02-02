import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header, useTitle, Footer, UsersTagesById, UserSavesById, UsersPostsById, ModalUserByIdSettings } from '../Components/Exports'
import { BsBookmarks, BsThreeDots, BsGrid, BsPersonLinesFill } from 'react-icons/bs';
import { useState } from 'react';
import { FeatureAction } from '../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
import { useGetUserByIdQuery } from '../Redux/APIs/UserApi';
import { BiChevronDown } from 'react-icons/bi';
import { IoPersonAddOutline } from 'react-icons/io5';

const Profile = () => {
    useTitle('Profile');
    const params = useParams();
    const { username } = params;
    const { data: userInfo, isError, isFeatching, error } = useGetUserByIdQuery(username) || {};
    const dispatch = useDispatch();
    const [isFollowing, setIsFollowing] = useState(false);
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
        <div className='mt-24'>
            <Header />
            <ModalUserByIdSettings />
            {isFeatching ? <p>Featching</p> : isError && <p>{error?.data?.msg}</p>}
            <div className='container px-0 max-w-[85rem] mt-5'>
                <div className='container px-.5 max-w-[70rem] px-0'>
                    <div className='grid grid-cols-6 md:grid-cols-7 gap-3 mb-8'>
                        <img className='h-60 max-w-60 rounded-full col-span-2  flex justify-center items-center' src={userInfo?.avatar?.url} alt='' />
                        <div className='col-span-4 md:col-span-5 flex justify-start mt-10'>
                            <div className='space-y-5'>
                                <div className='flex items-center gap-6'>
                                    <p className='text-xl font-semibold'>{userInfo?.fullname}</p>
                                    {isFollowing ?
                                        <>
                                            <Link to='/' className='bg-gray-200 font-medium rounded-md flex items-center px-3 py-2 gap-2'>Following <BiChevronDown size={22} /></Link>
                                            <Link to='/' className='bg-gray-200 font-medium rounded-md flex items-center px-3 py-2 gap-2'>Message</Link>
                                        </>
                                        :
                                        <>
                                            <Link to='/' className='bg-blue-500 text-white font-medium rounded-md flex items-center px-6 py-2 gap-2'>Follow</Link>
                                            <Link to='/' className='bg-gray-200 font-medium rounded-md flex items-center px-3 py-2 gap-2'><IoPersonAddOutline size={22} /></Link>
                                        </>
                                    }
                                    <button onClick={() => dispatch(FeatureAction.Show_iSModalSittings(true))}><BsThreeDots size={24} /></button>
                                </div>
                                <div className='flex gap-5'>
                                    <p className='text-lg font-mono'>{userInfo?.posts?.length} posts</p>
                                    <p className='text-lg font-mono'>{userInfo?.followers?.length} follower</p>
                                    <p className='text-lg font-mono'>{userInfo?.following?.length} following</p>
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
                {posts && <UsersPostsById ID={userInfo?._id} />}
                {saved && <UserSavesById />}
                {tagged && <UsersTagesById />}
            </div>
            <div className='mt-40'>
                <Footer />
            </div>
        </div>
    )
}

export default Profile
