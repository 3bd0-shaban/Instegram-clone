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

                    <div className={state === 'entering' ? 'Modal scale-[1.05] !p-0 !overflow-hidden duration-75'
                        : state === 'exiting' ? 'Modal  scale-[1.4] !p-0 !overflow-hidden duration-75' : 'Modal !p-0 !overflow-hidden scale-100'}>

                        <div className='w-full text-center mx-auto'>
                            <span className='block cursor-pointer text-red-600 font-bold py-4 hover:bg-gray-100'>Block</span><hr />
                            <span className='block cursor-pointer text-red-600 font-bold py-4 hover:bg-gray-100'>Restrict</span><hr />
                            <span className='block cursor-pointer text-red-600 font-bold py-4 hover:bg-gray-100'>Report</span><hr />
                            <span className='block cursor-pointer focus:bg-gray-500 py-4 hover:bg-gray-100' onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} >Cancel</span>
                        </div>
                    </div>
                </div>)}
        </Transition>
    )
}

export default ModalUserByIdSettings
