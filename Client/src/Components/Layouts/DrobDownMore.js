import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { BsBookmarkCheck, BsGear, BsJournals, BsMoon, BsPeople, BsQuestionCircle, BsToggleOff } from 'react-icons/bs'
import { FeatureAction } from '../../Redux/Slices/FeaturesSlice';
import { useLogOutMutation } from '../../Redux/APIs/AuthApi';
import { useGetUserQuery } from '../../Redux/APIs/UserApi';
import { motion, AnimatePresence } from 'framer-motion';
import AnimDropdown from '../../Animation/AnimDropdown';

const DrobDownMore = () => {
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
        DrobdownMore &&
        <AnimatePresence>
            <div onClick={() => dispatch(FeatureAction.ShowDrobdownMore(false))} className="fixed inset-0 z-20"></div>
            <motion.div
                variants={AnimDropdown}
                initial='exit'
                animate='animate'
                exit='exit'
                className='dropdowntoggle'
            >
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
            </motion.div>
        </AnimatePresence>
    )
}

export default DrobDownMore
