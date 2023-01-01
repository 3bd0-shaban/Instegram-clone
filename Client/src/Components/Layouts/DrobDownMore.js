import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { BsBookmarkCheck, BsGear, BsJournals, BsMoon, BsPeople, BsQuestionCircle, BsToggleOff } from 'react-icons/bs'
import { ShowDrobdownMore } from '../../Redux/Slices/FeaturesSlice';
import { useLogOutMutation } from '../../Redux/APIs/AuthApi';
const DrobDownMore = () => {
    const { DrobdownMore } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    const [logOut] = useLogOutMutation();
    const navigate = useNavigate();
    const HandleLogOut = async () => {
        await logOut().unwrap()
            .then((payload) => {
                dispatch(ShowDrobdownMore(false));
                navigate('/signin')
            })
            .catch((err) => {
                console.log(err)
            });
    }
    const DropItem = (props) => {
        return (
            <Link onClick={() => dispatch(ShowDrobdownMore(false))} className='flex gap-3 items-center justify-between px-3 rounded-lg hover:bg-gray-200'>
                <div className='flex gap-3 items-center py-2 duration-200 focus:px-1'>
                    <div className='text-[1.4rem]'>{props.Icon}</div>
                    <span className='whitespace-nowrap'>{props.Title}</span>
                </div>
                <div className='text-2xl'>{props.Toggle}</div>
            </Link>
        )
    }
    return (
        DrobdownMore &&
        <>
            <div onClick={() => dispatch(ShowDrobdownMore(false))} className="fixed inset-0 z-20"></div>
            <div className='absolute z-30 top-[3rem] right-0 shadow-gray-200 drop-shadow-lg rounded-lg bg-[rgb(255,255,255,.9)] backdrop-blur-xl text-base font-semibold w-[19rem]'>
                <div className='px-2 py-2'>
                    <DropItem Icon={<BsPeople />} Title={'Profile'} />
                    <DropItem Icon={<BsJournals />} Title={'Saved'} />
                    <DropItem Icon={<BsMoon />} Title={'Switch Apperance'} />
                    <DropItem Icon={<BsGear />} Title={'Settings'} Toggle={<BsToggleOff />} />
                    <DropItem Icon={<BsBookmarkCheck />} Title={'Animations'} />
                    <DropItem Icon={<BsQuestionCircle />} Title={'Report a problem'} />
                    <DropItem Icon={<BsBookmarkCheck />} Title={'Switch accounts'} />
                </div><hr />
                <Link onClick={HandleLogOut} className='flex gap-3 items-center justify-between px-6 py-3 hover:bg-gray-200'>
                    <span className='whitespace-nowrap font-normal'>Log Out</span>
                </Link>
            </div>
        </>
    )
}

export default DrobDownMore
