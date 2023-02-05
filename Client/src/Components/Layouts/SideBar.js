import React, { useState } from 'react'
import { BsHeart, BsHouseDoorFill, BsInstagram, BsList, BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import InstegramFont from './InstegramFont'
import { RiMessengerLine } from 'react-icons/ri'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { IoHeartDislikeCircleOutline } from 'react-icons/io5'
import { useGetUserQuery } from '../../Redux/APIs/UserApi'
import { useBreakpoint, Search, Notifications } from '../Exports'

const SideBar = () => {
    const breakpoint = useBreakpoint();
    const [openSerach, setOpenSearch] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const { data: userInfo } = useGetUserQuery() || {};
    const HandleOpenSearch = () => {
        setOpenSearch(true); setOpenNotification(false)
    }
    const HandleOpenNotification = () => {
        setOpenSearch(false); setOpenNotification(false)
    }
    // const lapview = (breakpoint === 'xxxl' || breakpoint === 'xxl' || breakpoint === 'xl')
    const SideLink = ({ Icon, Title, Linkdirect, OnClick }) => {
        return (
            <Link to={Linkdirect} onClick={OnClick} className={`flex gap-5 items-center py-3 lg:py-5 w-full xl:w-auto justify-center lg:justify-start`}>
                {/* <div className={`${openSerach && 'rounded-full border p-2 flex items-center justify-center'}`}> */}
                {Icon}
                {/* </div> */}
                {(breakpoint === ('xxxl' || 'xxl') && !openSerach && !openNotification) &&
                    <p className='text-2xl font-light'>{Title}</p>
                }
            </Link>
        )
    }
    return (
        <>

            <div className={`fixed w-[6rem] z-20 xxl:w-[19.5rem] h-screen duration-500 bg-white border-r p-6 xxl:p-8 pt-14 hidden lg:block ${(openSerach || openNotification) && 'xxl:w-[6rem]'}`}>
                <div className={`hidden xxl:block mt-5 ${(openSerach || openNotification) && 'xxl:!hidden'}`}>
                    <InstegramFont />
                </div>
                <div className={`block xxl:hidden mt-5 ${(openSerach || openNotification) && 'xxl:!block'}`}>
                    <BsInstagram size={30} />
                </div>
                <div className='mt-16'>
                    <SideLink Icon={<BsHouseDoorFill size={30} />} Title='Home' />
                    <SideLink Icon={<BsSearch size={30} />} Title='Search' OnClick={HandleOpenSearch} />
                    <SideLink Icon={<IoHeartDislikeCircleOutline size={30} />} Title='Explore' />
                    <SideLink Icon={<BsInstagram size={28} />} Title='Reels' />
                    <SideLink Icon={<RiMessengerLine size={30} />} Title='Messages' />
                    <SideLink Icon={<BsHeart size={30} />} Title='Notification' onClick={HandleOpenNotification} />
                    <SideLink Icon={<BiMessageSquareAdd size={30} />} Title='Create' />
                    <SideLink Linkdirect={`/${userInfo?.username}`}
                        Icon={<img src={userInfo?.avatar?.url}
                            alt={userInfo?.username}
                            className='rounded-full w-10 h-10' />} Title='Profile' />
                    <Link className='flex gap-5 items-center my-12 absolute bottom-0 '>
                        <BsList size={30} />
                        <p className={`text-2xl font-light hidden xxl:block ${(openSerach || openNotification) && 'xxl:!hidden'}`}>More</p>
                    </Link>
                </div>
            </div>

            {/* Mobile View  */}
            <>
                <div className='fixed top-0 flex lg:hidden justify-between items-center w-full border-b bg-white px-5'>
                    <InstegramFont />
                    <div className='flex gap-5 items-center'>
                        <SideLink Icon={<BiMessageSquareAdd size={30} />} Title='Create' />
                        <SideLink Icon={<BsHeart size={30} />} Title='Notification' />
                    </div>
                </div>
                <div className='fixed flex justify-center left-[6rem]'>
                    {openSerach &&
                        <>
                            <div onClick={() => setOpenSearch(false)} className='z-10 inset-0 fixed bg-black/20'></div>
                            <Search />
                        </>
                    }
                    {openNotification &&
                        <>
                            <div onClick={() => setOpenSearch(false)} className='z-10 inset-0 fixed bg-black/20'></div>
                            <Notifications />
                        </>
                    }
                </div>

                <div className='fixed w-full bottom-0 duration-500 bg-white border-t lg:hidden block'>
                    <div className='flex gap-5 w-full'>
                        <SideLink Icon={<BsHouseDoorFill size={30} />} Title='Home' />
                        <SideLink Icon={<BsSearch size={28} />} Title='Search' />
                        <SideLink Icon={<BsInstagram size={28} />} Title='Reels' />
                        <SideLink Icon={<RiMessengerLine size={30} />} Title='Messages' />
                        <SideLink
                            Linkdirect={`/${userInfo?.username}`}
                            Icon={<img src={userInfo?.avatar?.url}
                                alt={userInfo?.username}
                                className='rounded-full w-10 h-10' />}
                            Title='Profile'
                        />

                    </div>
                </div>
            </>


        </>
    )
}

export default SideBar
