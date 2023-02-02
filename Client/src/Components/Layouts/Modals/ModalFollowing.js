import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { Transition } from 'react-transition-group';
import { useFollowingListQuery } from '../../../Redux/APIs/UserApi';
import { Link } from 'react-router-dom';

const ModalFollowing = ({ id }) => {
    const { isModalFollowingList } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    const nodeRef = useRef(null);
    const { data: FollowingList } = useFollowingListQuery(id) || {};
    return (
        <Transition nodeRef={nodeRef} in={isModalFollowingList} timeout={50} mountOnEnter unmountOnExit>
            {state => (
                <div ref={nodeRef}>
                    <div onClick={() => dispatch(FeatureAction.setIsModalFollowingList(false))} className="fixed inset-0 bg-black/40 z-10"></div>

                    <div className={state === 'entering' ? 'Modal scale-[1.05] duration-75'
                        : state === 'exiting' ? 'Modal scale-[1.4] duration-75' : 'Modal scale-100'}>
                        <div className='flex justify-center items-center font-semibold text-xl pt-1'>Following</div><hr />

                        {FollowingList?.follwing?.map(res => (
                            <div className='flex justify-between items-center'>
                                <Link
                                    to={`/${res.username}`}
                                    key={res._id}
                                    className='flex'
                                >
                                    <img className="p-1 w-14 h-14 object-cover rounded-full focus:ring-2 focus:ring-gray-300" src={res?.avatar?.url} alt="" />
                                    <div className='ml-2 mt-1'>
                                        <p className='text-md font-poppins font-medium'>{res?.username}</p>
                                        <p className='text-sm text-gray-500'>New in Instegram</p>
                                    </div>
                                </Link>
                                <button className='font-semibold text-blue-400'>follow</button>
                            </div>
                        ))}
                    </div>
                </div>)}
        </Transition>
    )
}

export default ModalFollowing
