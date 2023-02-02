import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { Transition } from 'react-transition-group';

const ModalUserByIdSettings = () => {
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

            <div className={state === 'entering' ? 'Modal scale-[1.05] duration-75'
                : state === 'exiting' ? 'Modal  scale-[1.4] duration-75' : 'Modal scale-100'}>

                <div className="bg-white w-full rounded-xl shadow drop-shadow-xl flex justify-center items-center">
                    <div className='space-y-5 w-full text-center mx-auto py-6'>
                        <span className='block cursor-pointer text-red-600 font-bold'>Block</span><hr/>
                        <span className='block cursor-pointer text-red-600 font-bold'>Restrict</span><hr/>
                        <span className='block cursor-pointer text-red-600 font-bold'>Report</span><hr/>
                        <span className='block cursor-pointer focus:bg-gray-500' onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} >Cancel</span>
                    </div>
                </div>
            </div>
        </div>)}
</Transition>
  )
}

export default ModalUserByIdSettings
