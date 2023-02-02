import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { Transition } from 'react-transition-group';

const ModalSittings = (props) => {
    const { isModalSittings } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    const nodeRef = useRef(null);
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = isModalSittings ? 'hidden' : 'auto';
    }, [isModalSittings]);

    return (
        <Transition nodeRef={nodeRef} in={isModalSittings} timeout={50} mountOnEnter unmountOnExit>
            {state => (
                <div ref={nodeRef}>
                    <div onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} className="fixed inset-0 bg-black/40 z-10"></div>

                    <div className={state === 'entering' ? 'Modal scale-[1.05] !max-h-[50rem] !overflow-hidden !top-[10%] duration-75'
                        : state === 'exiting' ? 'Modal !top-[10%] !max-h-[50rem] !overflow-hidden scale-[1.4] duration-75' : 'Modal !top-[10%] !max-h-[50rem] !overflow-hidden scale-100'}>

                        <div className='space-y-5 w-full text-center mx-auto py-6'>
                            <span className='block cursor-pointer'>Change Password</span><hr />
                            <span className='block cursor-pointer'>QR Code</span><hr />
                            <span className='block cursor-pointer'>Apps and Websites</span><hr />
                            <span className='block cursor-pointer'>Notifications</span><hr />
                            <span className='block cursor-pointer'>Privacy and scurity</span><hr />
                            <span className='block cursor-pointer'>Supervision</span><hr />
                            <span className='block cursor-pointer'>Login activity</span><hr />
                            <span className='block cursor-pointer'>Emails from Instegram</span><hr />
                            <span className='block cursor-pointer'>Report a propblem</span><hr />
                            <span className='block cursor-pointer'>Embed</span><hr />
                            <span className='block cursor-pointer'>Log Out</span><hr />
                            <span className='block cursor-pointer focus:bg-gray-500' onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} >Cancel</span>
                        </div>
                    </div>
                </div>)}
        </Transition>
    )
}

export default ModalSittings
