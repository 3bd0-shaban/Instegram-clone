import React, { useEffect, useState } from 'react'
import { BiChevronRight } from 'react-icons/bi';

const ImagesSlider = (props) => {
    const [curIndex, setCurIndex] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const details = props.Details
        setImages(details?.images)
    }, [props.Details]);
    const prevSlide = () => {
        const isFirstSlide = curIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : curIndex - 1;
        setCurIndex(newIndex);
    };
    const nextSlide = () => {
        const isLastSlide = curIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : curIndex + 1;
        setCurIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurIndex(slideIndex);
    };
    return (
        <>

            <img className='imageslide' src={images && images[curIndex]?.url} alt='' />
            <div className='absolute inset-y-1/2 flex justify-between w-full px-4'>
                <button onClick={prevSlide} className='bg-white/30 text-black h-8 w-8 rounded-full flex justify-center items-center'>
                    <BiChevronRight size={25} />
                </button>
                <button onClick={nextSlide} className='bg-white/30 text-black h-8 w-8 rounded-full flex justify-center items-center'>
                    <BiChevronRight size={25} />
                </button>
            </div>
            <div className='flex gap-2 justify-center text-7xl inset-x-1/2 bottom-0 absolute py-2'>
                {images?.map((slide, slideIndex) => (
                    <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className={slideIndex === curIndex ?
                        ' cursor-pointer text-white'
                        :
                        'text-gray-500 cursor-pointer'}>
                        <span className='h-5 w-5'>.</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ImagesSlider
