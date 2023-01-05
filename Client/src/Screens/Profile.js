import React from 'react'
import { Link } from 'react-router-dom'
import { Header, useTitle, UserSaves, UsersPosts, UsersTages, Footer, ModalSittings } from '../Components/Exports'
import { BsBookmarks, BsGear, BsGrid, BsPersonLinesFill } from 'react-icons/bs';
import { useState } from 'react';
import { FeatureAction } from '../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
import { useGetUserQuery } from '../Redux/APIs/AuthApi';

const Profile = () => {
    useTitle('Profile');
    // const params = useParams();
    // const { username } = params;
    const { data: userInfo, isError, isFeatching, error } = useGetUserQuery() || {};
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
        <div>
            <Header />
            <ModalSittings />
            {isFeatching ? <p>Featching</p> : isError && <p>{error?.data?.msg}</p>}
            <div className='container px-0 max-w-[85rem] mt-5'>
                <div className='container px-.5 max-w-[70rem] px-0'>
                    <div className='grid grid-cols-6 md:grid-cols-7 gap-3 mb-8'>
                        <img className='h-60 max-w-60 rounded-full col-span-2  flex justify-center items-center' src={userInfo?.avatar?.url} alt='' />
                        <div className='col-span-4 md:col-span-5 flex justify-start mt-10'>
                            <div className='space-y-5'>
                                <div className='flex items-center gap-6'>
                                    <p className='text-xl font-semibold'>{userInfo?.fullname}</p>
                                    <Link to='/' className='bg-[#DBDBDB] font-medium rounded-md flex items-center px-3 py-2'>Edit Profile</Link>
                                    <button onClick={() => dispatch(FeatureAction.Show_iSModalSittings(true))}><BsGear size={24} /></button>
                                </div>
                                <div className='flex gap-5'>
                                    <p className='text-lg font-mono'>0 posts</p>
                                    <p className='text-lg font-mono'>0 follower</p>
                                    <p className='text-lg font-mono'>0 following</p>
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
