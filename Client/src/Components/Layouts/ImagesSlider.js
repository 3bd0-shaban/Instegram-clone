import React, { useEffect, useRef, useState } from 'react'
import { BiChevronRight } from 'react-icons/bi';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ImagesSlider = (props) => {
    const nodeRef = useRef(null);
    const [curIndex, setCurIndex] = useState(0);
    const [dirSlide, setDirSlide] = useState('slide-right');
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        setImages([props.Details]?.images)
    }, [props.Details]);
    const prevSlide = () => {
        const isFirstSlide = curIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : curIndex - 1;
        setCurIndex(newIndex);
        setDirSlide('slide-left');
    };
    const nextSlide = () => {
        const isLastSlide = curIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : curIndex + 1;
        setCurIndex(newIndex);
        setDirSlide('slide-right');
    };
    const goToSlide = (slideIndex) => {
        setCurIndex(slideIndex);
    };
    return (
        <>

            <TransitionGroup >
                <CSSTransition nodeRef={nodeRef} key={images && images[curIndex]?.url} timeout={500} classNames={dirSlide}>
                    <img ref={nodeRef} className='imageslide' src={images && images[curIndex]?.url} alt='' />
                </CSSTransition>
            </TransitionGroup>

            <div className='absolute inset-y-1/2 flex justify-between w-full px-4'>
                <button onClick={prevSlide} className='bg-white/30 text-black h-8 w-8 rounded-full flex justify-center items-center'><BiChevronRight size={25} /></button>
                <button onClick={nextSlide} className='bg-white/30 text-black h-8 w-8 rounded-full flex justify-center items-center'><BiChevronRight size={25} /></button>
            </div>
            <div className='flex gap-2 justify-center text-7xl inset-x-1/2 bottom-0 absolute py-2'>
                {images?.map((slide, slideIndex) => (
                    <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className={slideIndex === curIndex ? ' cursor-pointer text-white' : 'text-gray-500 cursor-pointer'}><span className='h-5 w-5'>.</span></div>
                ))}
            </div>
        </>
    )
}

export default ImagesSlider
