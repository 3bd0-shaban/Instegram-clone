import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { BsGear, BsJournals, BsMoon, BsPeople, BsToggleOff } from 'react-icons/bs'
import { FeatureAction } from '../../Redux/Slices/FeaturesSlice';
import { useLogOutMutation } from '../../Redux/APIs/AuthApi';
import { motion, AnimatePresence } from 'framer-motion';
import AnimDropdown from '../../Animation/AnimDropdown';
import { selectCurrentUser } from '../../Redux/Slices/UserSlice';

const DrobDownMore = () => {
    const userInfo = useSelector(selectCurrentUser)
    const dispatch = useDispatch();
    const [logOut] = useLogOutMutation();
    const navigate = useNavigate();
    const HandleLogOut = async () => {
        await logOut().unwrap()
            .then((payload) => {
                dispatch(FeatureAction.ShowDrobdownMore(false));
                localStorage.removeItem('persist')
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
        <AnimatePresence>
            <div onClick={() => dispatch(FeatureAction.ShowDrobdownMore(false))} className="fixed inset-0 z-20"></div>
            <motion.div
                variants={AnimDropdown}
                initial='exit'
                animate='animate'
                exit='exit'
                className='
               z-30 absolute bottom-24 left-3 shadow-gray-200 drop-shadow-lg rounded-lg bg-[rgb(255,255,255,.9)] backdrop-blur-xl text-base font-semibold w-[19rem]'
            >
                <div className='px-2 py-2'>
                    <DropItem Icon={<BsPeople />} Link={`/${userInfo?.username}`} Title={'Profile'} />
                    <DropItem Icon={<BsJournals />} Link={`/${userInfo?.username}?saves`} Title={'Saved'} />
                    <DropItem Icon={<BsMoon />} Link={`/${userInfo?.username}?posts`} Title={'My Posts'} />
                    {/* <DropItem Icon={<BsMoon />} Title={'Switch Apperance'} /> */}
                    <DropItem Icon={<BsGear />} Title={'Settings'} Link={'/settings/edit'} Toggle={<BsToggleOff />} />
                    {/* <DropItem Icon={<BsBookmarkCheck />} Title={'Animations'} /> */}
                    {/* <DropItem Icon={<BsQuestionCircle />} Title={'Report a problem'} /> */}
                    {/* <DropItem Icon={<BsBookmarkCheck />} Title={'Switch accounts'} /> */}
                </div><hr />
                <Link onClick={HandleLogOut} className='flex gap-3 items-center justify-between px-6 py-3 hover:bg-gray-200'>
                    <span className='whitespace-nowrap font-normal'>Log Out</span>
                </Link>
            </motion.div>
        </AnimatePresence>
    )
}

export default DrobDownMore
