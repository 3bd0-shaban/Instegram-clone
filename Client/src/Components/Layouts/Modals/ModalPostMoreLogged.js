import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Transition } from 'react-transition-group';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';

const ModalPostMoreLogged = () => {
    const { isModalPostMoreLogged } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    const nodeRef = useRef(null);
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = isModalPostMoreLogged ? 'hidden' : 'auto';
    }, [isModalPostMoreLogged]);

    return (
        <Transition nodeRef={nodeRef} in={isModalPostMoreLogged} timeout={50} mountOnEnter unmountOnExit>
            {state => (
                <div ref={nodeRef}>
                    <div onClick={() => dispatch(FeatureAction.Show_ModalPostMoreLogged(false))} className="fixed inset-0 bg-black/40 z-20"></div>

                    <div className={state === 'entering' ? 'Modal scale-[1.05] duration-75'
                        : state === 'exiting' ? 'Modal scale-[1.4] duration-75' : 'Modal scale-100'}>

                        <div className="bg-white w-full rounded-xl shadow drop-shadow-xl flex justify-center items-center">
                            <div className='space-y-5 w-full text-center mx-auto py-6'>
                                <span className='block text-red-600 font-medium cursor-pointer'>Report</span><hr />
                                <span className='block text-red-600 font-medium cursor-pointer'>unfollow</span><hr />
                                <span className='block cursor-pointer'>Add to favorite</span><hr />
                                <span className='block cursor-pointer'>Go to post</span><hr />
                                <span className='block cursor-pointer'>Share to ...</span><hr />
                                <span className='block cursor-pointer'>Copy link</span><hr />
                                <span className='block cursor-pointer'>Embed</span><hr />
                                <span className='block cursor-pointer' onClick={() => dispatch(FeatureAction.Show_ModalPostMoreLogged(false))} >Cancel</span>
                            </div>
                        </div>
                    </div>
                </div>)}
        </Transition>
    )
}

export default ModalPostMoreLogged
