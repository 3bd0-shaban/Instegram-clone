import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { Transition } from 'react-transition-group';
import { useEffect } from 'react';

const PostMore = (props) => {
    const { isPostMore } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    const nodeRef = useRef(null);
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = isPostMore ? 'hidden' : 'auto';
    }, [isPostMore]);

    return (
        <Transition nodeRef={nodeRef} in={isPostMore} timeout={70} mountOnEnter unmountOnExit>
            {state => (
                <div ref={nodeRef}>
                    <div onClick={() => dispatch(FeatureAction.Show_isPostMore(false))} className="fixed inset-0 bg-black/40 z-20"></div>

                    <div className={state === 'entering' ? 'Modal scale-[1.05] !overflow-hidden duration-200'
                        : state === 'exiting' ? 'Modal scale-[1.4] !overflow-hidden duration-200' : 'Modal !overflow-hidden scale-100'}>
                        <div className='space-y-5 w-full text-center mx-auto py-6'>
                            <span className='block text-red-600 font-medium cursor-pointer'>Report</span><hr />
                            <span className='block text-red-600 font-medium cursor-pointer'>unfollow</span><hr />
                            <span className='block cursor-pointer'>Add to favorite</span><hr />
                            <span className='block cursor-pointer'>Go to post</span><hr />
                            <span className='block cursor-pointer'>Share to ...</span><hr />
                            <span className='block cursor-pointer'>Copy link</span><hr />
                            <span className='block cursor-pointer'>Embed</span><hr />
                            <span className='block cursor-pointer' onClick={() => dispatch(FeatureAction.Show_isPostMore(false))} >Cancel</span>
                        </div>
                    </div>
                </div>)}
        </Transition>
    )
}

export default PostMore
