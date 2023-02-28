import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SideBar, useTitle, UserSaves, UsersPosts, UsersReels, Footer, ModalSettings, ModalFollowers, ModalFollowing, ModalChangeProfile } from '../Components/Exports'
import { BsBookmarks, BsGear, BsGrid, BsPersonLinesFill } from 'react-icons/bs';
import { FeatureAction } from '../Redux/Slices/FeaturesSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../Redux/Slices/UserSlice';
import { LoadingAlerts } from '../Components/Layouts/Alerts';
import { FiPlus } from 'react-icons/fi';

const Profile = () => {
    const userInfo = useSelector(selectCurrentUser)
    const { isModalFollowersList, isModalFollowingList, isModalSettings, isModalChangeProfile } = useSelector(state => state.Features);
    useTitle(userInfo?.fullname);
    const dispatch = useDispatch();
    const location = useLocation();
    const posts = (location.search === `?posts` || location.search === ``)
    const saved = (location.search === `?saves`)
    const Reels = (location.search === `?reels`)
    return (
        <div className='bg-white'>
            <SideBar />
            {isModalFollowingList && <ModalFollowing id={userInfo?._id} />}
            {isModalFollowersList && <ModalFollowers id={userInfo?._id} />}
            {isModalChangeProfile && (
                <ModalChangeProfile
                    onClose={() => dispatch(FeatureAction.setIsModalChangeProfile(false))}
                    loading={<LoadingAlerts />}
                />
            )}
            {isModalSettings && <ModalSettings />}
            <div className='container px-0 max-w-[85rem] pt-14 lg:mt-0 mt-5'>
                <div className='container px-3 max-w-[70rem]'>
                    <div className='flex gap-3 sm:gap-24 lg:justify-center items-center mb-8'>
                        <button onClick={() =>
                            dispatch(FeatureAction.setIsModalChangeProfile(true))
                        }
                            className='relative group'
                        >
                            <div className='hidden rounded-full group-hover:flex text-white items-center justify-center absolute p-2 inset-0 hover:bg-black/20'>
                                <FiPlus />
                            </div>
                            <img className='w-40 h-40 lg:w-48 lg:h-48 rounded-full col-span-2 flex justify-center items-center object-cover' src={userInfo?.avatar?.url ? userInfo?.avatar?.url : process.env.REACT_APP_DefaultIcon} alt='' />
                        </button>
                        <div className='col-span-4 md:col-span-5 flex justify-start mt-10'>
                            <div className='space-y-5'>
                                <p className='text-lg font-semibold'>{userInfo?.fullname}</p>
                                <p className='text-lg text-gray-500'>{userInfo?.bio}</p>
                                <div className='flex items-center gap-6'>
                                    <Link to='/settings/edit' className='bg-gray-200 font-medium rounded-md flex items-center px-3 py-2 focus:bg-gray-300'>Edit Profile</Link>
                                    <button onClick={() => dispatch(FeatureAction.Show_iSModalSittings(true))}><BsGear size={24} /></button>
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
                        <Link to='?posts' className={posts ? 'profileitems !text-black border-t border-black' : 'profileitems'}>
                            <BsGrid />
                            <p>Posts</p>
                        </Link>
                        <Link to='?saves' className={saved ? 'profileitems !text-black border-t border-black' : 'profileitems'}>
                            <BsBookmarks />
                            <p>Saved</p>
                        </Link>
                        <Link to='?reels' className={Reels ? 'profileitems !text-black border-t border-black' : 'profileitems'}>
                            <BsPersonLinesFill />
                            <p>Reels</p>
                        </Link>
                    </div>
                </div>
                {posts && <UsersPosts userInfo={userInfo} />}
                {saved && <UserSaves userInfo={userInfo} />}
                {Reels && <UsersReels userInfo={userInfo} />}
            </div>
            <div className='mt-40'>
                <Footer />
            </div>
        </div>
    )
}

export default Profile
