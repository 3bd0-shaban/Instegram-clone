import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { BsBookmarkCheck, BsGear, BsJournals, BsMoon, BsPeople, BsQuestionCircle, BsToggleOff } from 'react-icons/bs'
import { FeatureAction } from '../../Redux/Slices/FeaturesSlice';
import { useGetUserQuery, useLogOutMutation } from '../../Redux/APIs/AuthApi';
import { Transition } from 'react-transition-group';

const DrobDownMore = () => {
    const nodeRef = useRef(null);
    const { data: userInfo } = useGetUserQuery() || {};
    const { DrobdownMore } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    const [logOut] = useLogOutMutation();
    const navigate = useNavigate();
    const HandleLogOut = async () => {
        await logOut().unwrap()
            .then((payload) => {
                dispatch(FeatureAction.ShowDrobdownMore(false));
                navigate('/signin')
            })
            .catch((err) => {
                console.log(err)
            });
    }
    const DropItem = (props) => {
        return (
            <Link onClick={() => dispatch(FeatureAction.ShowDrobdownMore(false))} to={props.Link} className='flex gap-3 items-center justify-between px-3 rounded-lg hover:bg-gray-200'>
                <div className='flex gap-3 items-center py-2 duration-200 focus:px-1'>
                    <div className='text-[1.4rem]'>{props.Icon}</div>
                    <span className='whitespace-nowrap'>{props.Title}</span>
                </div>
                <div className='text-2xl'>{props.Toggle}</div>
            </Link>
        )
    }
    return (
        <Transition nodeRef={nodeRef} in={DrobdownMore} timeout={50} mountOnEnter unmountOnExit>
            {state => (
                <>
                    <div onClick={() => dispatch(FeatureAction.ShowDrobdownMore(false))} ref={nodeRef} className="fixed inset-0 z-20"></div>
                    <div className={state === 'entering' ? 'dropdowntoggle -translate-y-2 duration-50'
                        : state === 'exiting' ? 'dropdowntoggle scale-[1.1] -translate-y-2 duration-200' : 'dropdowntoggle duration-75'}>
                        <div className='px-2 py-2'>
                            <DropItem Icon={<BsPeople />} Link={`/${userInfo?.username}`} Title={'Profile'} />
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
            )}
        </Transition>
    )
}

export default DrobDownMore
