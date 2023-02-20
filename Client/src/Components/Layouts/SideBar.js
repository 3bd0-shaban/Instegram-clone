import React, { useState } from 'react'
import { BsHeart, BsHouseDoorFill, BsInstagram, BsList, BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { InstegramFont, DrobDownMore, ModalAddPost } from '../Exports'
import { RiMessengerLine } from 'react-icons/ri'
import { BiChevronLeft } from 'react-icons/bi'
import { IoHeartDislikeCircleOutline } from 'react-icons/io5'
import { useBreakpoint, Search, Notifications } from '../Exports'
import { FeatureAction } from '../../Redux/Slices/FeaturesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom';
import { selectCurrentUser } from '../../Redux/Slices/UserSlice'
import { FiPlus } from 'react-icons/fi';

const SideBar = () => {
    const breakpoint = useBreakpoint();
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams();
    const settingHeadline = location.pathname.split('/').slice(-1)[0]
    const [openSerach, setOpenSearch] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const { DrobdownMore } = useSelector(state => state.Features);
    const userInfo = useSelector(selectCurrentUser)
    const HandleOpenSearch = () => {
        setOpenSearch(!openSerach); setOpenNotification(false)
    }
    const HandleOpenNotification = () => {
        setOpenSearch(false); setOpenNotification(false)
    }
    const MobileView = (breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg');
    const SideLink = ({ Icon, Title, Linkdirect, OnClickEvent }) => {
        return (
            <div onClick={OnClickEvent} className='w-full'>
                <Link to={Linkdirect} className={`flex gap-5 items-center py-3 lg:py-5 w-full xl:w-auto justify-center lg:justify-start`}>
                    {/* <div className={`${openSerach && 'rounded-full border p-2 flex items-center justify-center'}`}> */}
                    {Icon}
                    {/* </div> */}
                    {(breakpoint === ('xxxl' || 'xxl') && !openSerach && !openNotification) &&
                        <p className='text-2xl font-light'>{Title}</p>
                    }
                </Link>
            </div>
        )
    }
    return (
        <>
            {!MobileView &&
                <div className={`fixed w-[6rem] z-10 xxl:w-[19.5rem] h-screen duration-500 bg-white border-r p-6 xxl:p-8 pt-14 lg:block ${(openSerach || openNotification) && 'xxl:w-[6rem]'}`}>
                    <Link to='/' className={`hidden xxl:block mt-5 ${(openSerach || openNotification) && 'xxl:!hidden'}`}>
                        <InstegramFont />
                    </Link>
                    <Link to='/' className={`block xxl:hidden mt-5 ${(openSerach || openNotification) && 'xxl:!block'}`}>
                        <BsInstagram size={30} />
                    </Link>
                    <div className='mt-16'>
                        <SideLink Linkdirect='/' Icon={<BsHouseDoorFill size={30} />} Title='Home' />
                        <SideLink Icon={<BsSearch size={30} />} Title='Search' OnClickEvent={HandleOpenSearch} />
                        <SideLink Icon={<IoHeartDislikeCircleOutline size={30} />} Title='Explore' />
                        <SideLink Icon={<BsInstagram size={28} />} Title='Reels' />
                        <SideLink Icon={<RiMessengerLine size={30} />} Title='Messages' Linkdirect='/messages' />
                        <SideLink Icon={<BsHeart size={30} />} Title='Notification' OnClickEvent={HandleOpenNotification} />
                        <SideLink
                            Icon={
                                <div className='border-2 border-black rounded-lg'>
                                    <FiPlus size={25} />
                                </div>}
                            Title='Create'
                            OnClickEvent={() => dispatch(FeatureAction.ShowModalAddPost(true))}
                        />
                        <SideLink
                            Linkdirect={`/${userInfo?.username}`}
                            Icon={<img src={userInfo?.avatar?.url ? userInfo?.avatar?.url: process.env.REACT_APP_DefaultIcon}
                                alt={userInfo?.username}
                                className='rounded-full w-10 h-10 object-cover' />} Title='Profile'
                        />
                        <Link
                            onClick={() => dispatch(FeatureAction.ShowDrobdownMore(true))}
                            className='flex gap-5 items-center my-12 absolute bottom-0 '>
                            <BsList size={30} />
                            <p className={`text-2xl font-light hidden xxl:block ${(openSerach || openNotification) && 'xxl:!hidden'}`}>More</p>
                        </Link>
                    </div>
                    <ModalAddPost />

                    {DrobdownMore && <DrobDownMore />}
                </div>}

            {/* Mobile View  */}

            <>
                {location.pathname.includes('settings') ?
                    <div className='flex lg:hidden gap-3 items-center py-2'>
                        <Link to={`/${userInfo?.username}`}><BiChevronLeft size={30} /></Link>
                        <span className='mx-auto'>{settingHeadline}</span>
                    </div>
                    :
                    (!id && !location.pathname.includes('messages')) &&
                    <>
                        <div className='fixed top-0 flex lg:hidden justify-between items-center w-full border-b bg-white px-5 z-10'>
                            <Link to='/'><InstegramFont /></Link>
                            <div className='flex gap-5 items-center'>
                                <SideLink
                                    Icon={<div className='border-2 border-black rounded-lg'>
                                        <FiPlus size={22} />
                                    </div>}
                                    OnClickEvent={() => dispatch(FeatureAction.ShowModalAddPost(true))}
                                    Title='Create' />
                                <SideLink Icon={<BsHeart size={28} />} Title='Notification' />
                            </div>
                        </div>
                        <div className='fixed flex justify-center left-[6rem]'>
                            {openSerach &&
                                <>
                                    <div onClick={() => setOpenSearch(false)} className='z-10 inset-0 fixed'></div>
                                    <Search />
                                </>
                            }
                            {openNotification &&
                                <>
                                    <div onClick={() => setOpenSearch(false)} className='z-10 inset-0 fixed'></div>
                                    <Notifications />
                                </>
                            }
                        </div>
                        <ModalAddPost />

                    </>
                }


                <div className='fixed w-full bottom-0 bg-white border-t lg:hidden block z-10'>
                    <div className='flex gap-5 w-full'>
                        <SideLink Linkdirect='/' Icon={<BsHouseDoorFill size={30} />} Title='Home' />
                        <SideLink Linkdirect='/search' Icon={<BsSearch size={28} />} Title='Search' />
                        <SideLink Icon={<BsInstagram size={28} />} Title='Reels' />
                        <SideLink Linkdirect='/messages' Icon={<RiMessengerLine size={30} />} Title='Messages' />
                        <SideLink
                            Linkdirect={`/${userInfo?.username}`}
                            Icon={<img src={userInfo?.avatar?.url ? userInfo?.avatar?.url: process.env.REACT_APP_DefaultIcon}
                                alt={userInfo?.username}
                                className='rounded-full w-8 h-8 object-cover' />}
                            Title='Profile'
                        />

                    </div>
                </div>
            </>


        </>
    )
}

export default SideBar
