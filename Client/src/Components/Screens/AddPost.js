import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useCreatePostMutation } from '../../Redux/APIs/PostsApi';
import { FeatureAction } from '../../Redux/Slices/FeaturesSlice';
import { ModalAddPost, ModalConfirm } from '../Exports';
import { ImSpinner7 } from 'react-icons/im';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const AddPost = () => {
  const { isModalAddPost, IsModalPreviewImages, isModalConfirm } = useSelector(state => state.Features);
  const [createPost, { isLoading }] = useCreatePostMutation();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [inputs, setInputs] = useState({
    location: '',
    des: ''
  });

  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };
  const loadFile = (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImages((imgs) => [...imgs, reader.result]);

      }
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
    dispatch(FeatureAction.ShowModalAddPost(false))
    dispatch(FeatureAction.Show_ModalPreviewImages(true))
  }

  const handlesubmit = async (e) => {
    const { des, location } = inputs;
    const data = { des, location, images };
    e.preventDefault();
    await createPost(data).unwrap();
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = (slides) => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = (slides) => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isModalAddPost || IsModalPreviewImages ? 'hidden' : 'auto';
  }, [isModalAddPost, IsModalPreviewImages])

  return (
    <>

      {isModalConfirm && <ModalConfirm />}


      {IsModalPreviewImages &&
        <>
          <div className="fixed inset-0 bg-black/40 z-10" onClick={() => dispatch(FeatureAction.Show_ModalConfirm(true))}></div>
          <div className="fixed inset-x-0 top-[10%] container px-0 max-w-4xl z-20 bg-white overflow-y-scroll rounded-lg shadow">
            <div className=" ">
              <div className="flex justify-between items-start py-4 rounded-t border-b px-4">
                <h3 className="text-xl font-semibold text-gray-900 mt-auto">Create New Post</h3>
                <div className="text-blue-500 font-semibold text-lg cursor-pointer">Next</div>
              </div>
              <div>
                <form onSubmit={handlesubmit}>
                  <div className='grid grid-cols-6'>
                    <div className='grid translate-x-0 transition-all ease-in-out col-span-4'>
                      {images && images.map((slides, index) => (
                        <img className='w-1/2 object-cover mx-3' src={slides} alt='' />
                      ))}
                    </div>
                    <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                      <BsChevronCompactLeft onClick={prevSlide} size={30} />
                    </div>
                    {/* Right Arrow */}
                    <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                      <BsChevronCompactRight onClick={nextSlide} size={30} />
                    </div>
                    <div className='h-full border-l px-5 col-span-2'>
                      <div className='flex items-center my-5 gap-5'>
                        <img src='' className='w-6 h-6 rounded-full' alt='' />
                        <p>AbdElrahamn</p>
                      </div>
                      <textarea onChange={handleChange} name='des' className='border outline-none w-full h-52 resize-none' placeholder='Write a caption' cols='10' /><hr />
                      <input onChange={handleChange} name='location' type='text' className='w-full outline-none' placeholder='Add Location' />
                      <button type='submit' className='px-8 bg-blue-500 text-white font-semibold py-2  rounded-xl mt-4 !mb-8' disabled={isLoading}>
                        {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Share'}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>}

      <ModalAddPost onClose={() => dispatch(FeatureAction.ShowModalAddPost(false))} ImageFun={loadFile} />
    </>
  )
}

export default AddPost
