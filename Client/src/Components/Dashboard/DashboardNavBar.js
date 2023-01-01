import React from 'react'
import { BiGroup } from 'react-icons/bi'
import { BsClockHistory } from 'react-icons/bs'
import { MdOutlineArticle, MdDashboardCustomize } from 'react-icons/md'
import { IoAnalytics, IoSettingsOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import {Users} from '../../Components/Exports'
const DashboardNavBar = () => {
    return (
        <div>
            <div className='container max-w-[90rem] px-3 bg-zinc-50 pb-4 rounded-md border-b border-r border-l '>
            <div className='flex justify-between md:px-12 py-6 border-b'>
                <p className='text-4xl font-serif font-semibold text-gray-600'>Instegram</p>
                <div className='gap-3 flex mt-4'>
                    <button className='border px-7 py-2 rounded-lg text-sm font-semibold hover:bg-white'>Edit</button>
                    <button className='border border-blue-600 px-7 py-2 rounded-lg text-sm font-semibold bg-green-500 hover:bg-greenue-700 text-white'>Create</button>
                </div>
            </div>
                <div className='py-6'>
                    <div className='grid grid-cols-4 gap-4'>
                        <Link className='flex font-poppins justify-center text-3xl font-medium hover:text-cyan-600'>
                            <div><MdDashboardCustomize /></div>
                            <p className='text-2xl'>Dashboard</p>
                        </Link>
                        <Link className='flex font-poppins justify-center text-3xl font-medium hover:text-cyan-600'>
                            <div><BiGroup /></div>
                            <p className='text-2xl'>User Mangements</p>
                        </Link>
                        <Link className='flex font-poppins justify-center text-3xl font-medium hover:text-cyan-600'>
                            <div><IoAnalytics /></div>
                            <p className='text-2xl'>Analyses</p>
                        </Link>
                        <Link className='flex font-poppins justify-center text-3xl font-medium hover:text-cyan-600'>
                            <div><IoSettingsOutline /></div>
                            <p className='text-2xl'>Settings</p>
                        </Link>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 '>
                    <div className='h-44 bg-white rounded-lg border shadow  px-5 relative md:hover:scale-105 duration-100'>
                        <div className='flex justify-between pt-3 '>
                            <p className='text-lg font-sans font-semibold text-gray-800'>Users</p>
                            <div className='rounded-full w-14 h-14 justify-center text-3xl bg-fuchsia-500 text-white px-2 flex items-center'>
                                <BiGroup />
                            </div>
                        </div>
                        <div className='flex items-center text-2xl font-semibold text-gray-600'>750</div>
                        <div className='flex absolute bottom-0 pb-3'>
                            <p className='w-14 h-6 rounded-md bg-green-200 text-green-400  text-sm flex justify-center items-center font-semibold'>13%</p>
                            <p className='font-light text-sm px-3 font-poppins text-gray-500'>Since Last Week</p>
                        </div>
                    </div>
                    <div className='h-44 bg-white rounded-lg border shadow  px-5 relative md:hover:scale-105 duration-100'>
                        <div className='flex justify-between pt-3 '>
                            <p className='text-lg font-sans font-semibold text-gray-800'>Posts</p>
                            <div className='rounded-full w-14 h-14 justify-center text-3xl bg-stone-500 text-white px-2 flex items-center'>
                                <MdOutlineArticle />
                            </div>
                        </div>
                        <div className='flex items-center text-2xl font-semibold text-gray-600'>750</div>
                        <div className='flex absolute bottom-0 pb-3'>
                            <p className='w-14 h-6 rounded-md bg-green-200 text-green-400  text-sm flex justify-center items-center font-semibold'>13%</p>
                            <p className='font-light text-sm px-3 font-poppins text-gray-500'>Since Last Week</p>
                        </div>
                    </div>
                    <div className='h-44 bg-white rounded-lg border shadow  px-5 relative md:hover:scale-105 duration-100'>
                        <div className='flex justify-between pt-3 '>
                            <p className='text-lg font-sans font-semibold text-gray-800'>Total Hours</p>
                            <div className='rounded-full w-14 h-14 justify-center text-3xl bg-sky-500 text-white px-2 flex items-center'>
                                <BsClockHistory />
                            </div>
                        </div>
                        <div className='flex items-center text-2xl font-semibold text-gray-600'>750</div>
                        <div className='flex absolute bottom-0 pb-3'>
                            <p className='w-14 h-6 rounded-md bg-green-200 text-green-400  text-sm flex justify-center items-center font-semibold'>13%</p>
                            <p className='font-light text-sm px-3 font-poppins text-gray-500'>Since Last Week</p>
                        </div>
                    </div>
                    <div className='h-44 bg-white rounded-lg border shadow  px-5 relative md:hover:scale-105 duration-100'>
                        <div className='flex justify-between pt-3 '>
                            <p className='text-lg font-sans font-semibold text-gray-800'>Users</p>
                            <div className='rounded-full w-14 h-14 justify-center text-3xl bg-orange-500 text-white px-2 flex items-center'>
                                <BiGroup />
                            </div>
                        </div>
                        <div className='flex items-center text-2xl font-semibold text-gray-600'>750</div>
                        <div className='flex absolute bottom-0 pb-3'>
                            <p className='w-14 h-6 rounded-md bg-green-200 text-green-400  text-sm flex justify-center items-center font-semibold'>13%</p>
                            <p className='font-light text-sm px-3 font-poppins text-gray-500'>Since Last Week</p>
                        </div>
                    </div>
                </div>
                <Users />
            </div>
        </div>
    )
}

export default DashboardNavBar
