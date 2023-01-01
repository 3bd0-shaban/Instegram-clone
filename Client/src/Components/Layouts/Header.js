import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { InstegramFont, ModalAddPost, ModalConfirm, DrobDownMore } from '../Exports'
import { MdKeyboardArrowDown, MdOutlineSearch } from 'react-icons/md'
import { IoHomeOutline } from 'react-icons/io5'
import { RiMessengerLine } from 'react-icons/ri'
import { TbMessageShare, TbHeart } from 'react-icons/tb'
import { MdAddCircleOutline } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { ShowDrobdownMore } from '../../Redux/Slices/FeaturesSlice';

const Header = () => {
    const [show, setShow] = useState();
    const [showSub, setShowSub] = useState();
    const dispatch = useDispatch();
    const handleshow = () => setShow(true);
    const handleshowSub = () => setShowSub(true);
    const handlecloseSub = () => setShowSub(false);
    const handlecloseAll = () => {
        setShow(false);
        setShowSub(false)
    };
    return (
        <div className='border-b border-gray-300 bg-white'>
            <div className='container max-w-6xl flex py-3 px-2'>
                <Link to='/' className='align-middle flex mt-2 gap-1'>
                    <InstegramFont />
                    <div className='place-content-center align-middle mt-1 text-2xl'><MdKeyboardArrowDown /></div>
                </Link>
                <div className='ml-auto hidden md:block'>
                    <form >
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none font-extralight text-2xl text-gray-400">
                                <MdOutlineSearch />
                            </div>
                            <input type="search" className="Searchbar" placeholder="Search" required="" />
                        </div>
                    </form>
                </div>
                {show && <ModalAddPost onClose={handleshowSub} />}
                {showSub && <ModalConfirm onClose={handlecloseSub} onDrop={handlecloseAll} />}
                <div className='flex ml-auto gap-3 sm:gap-5 text-3xl text-gray-600 align-middle mt-2'>
                    <Link to='/'><IoHomeOutline /></Link>
                    <Link to='/messages'><RiMessengerLine /></Link>
                    <Link to='/' onClick={handleshow}><MdAddCircleOutline /></Link>
                    <Link to='/'><TbMessageShare /></Link>
                    <Link to='/'><TbHeart /></Link>
                    <div className='relative'>
                        <button onClick={() => dispatch(ShowDrobdownMore(true))} className="flex text-sm rounded-full md:mr-0" data-dropdown-toggle="dropdown" id="dropdown-button" type="button">
                            <img className="p-1 w-10 h-10 rounded-full focus:ring-2 focus:ring-gray-300" src="/Images/profile.jpg" alt="" />
                        </button>
                        <DrobDownMore />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
