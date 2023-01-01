import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FeatureAction } from '../../Redux/Slices/FeaturesSlice';
import { ModalPreviewImages, ModalAddPost, ModalConfirm } from '../Exports';

const AddPost = () => {
  const { isModalAddPost, IsModalPreviewImages, isModalConfirm } = useSelector(state => state.Features);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

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

  if (IsModalPreviewImages === false) {

  }
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isModalAddPost || IsModalPreviewImages ? 'hidden' : 'auto';
  }, [isModalAddPost, IsModalPreviewImages])

  return (
    <>
      {isModalConfirm && <ModalConfirm />}
      {IsModalPreviewImages &&
        <>
          <div className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity z-10" onClick={() => dispatch(FeatureAction.Show_ModalConfirm(true))}></div>
          <div className="fixed inset-0 top-[10%] w-screen container px-0 max-w-4xl z-20 bg-white ">
            <div className=" rounded-lg shadow overflow-scroll">
              <div className="flex justify-between items-start py-4 rounded-t border-b px-4">
                <h3 className="text-xl font-semibold text-gray-900 mt-auto">Create New Post</h3>
                <div className="text-blue-500 font-semibold text-lg cursor-pointer">Next</div>
              </div>
              {images && images.map((image, index) => (
                <div className='grid translate-x-0 transition-all ease-in-out'>
                  <img className='w-1/2 object-cover mx-3' src={image} alt='' />
                </div>
              ))}
            </div>
          </div>
        </>}
      <ModalAddPost onClose={() => dispatch(FeatureAction.ShowModalAddPost(false))} ImageFun={loadFile} />
    </>
  )
}

export default AddPost
