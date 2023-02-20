// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { FeatureAction } from '../../Redux/Slices/FeaturesSlice';
// import { ModalAddPost, ModalConfirm, ModalPreviewImages } from '../Exports';

// const AddPost = () => {
//   const { IsModalPreviewImages, isModalConfirm } = useSelector(state => state.Features);
//   const dispatch = useDispatch();
//   const [images, setImages] = useState([]);

//   const loadFile = (e) => {
//     for (const file of e.target.files) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         setImages((imgs) => [...imgs, reader.result]);

//       }
//       reader.onerror = () => {
//         console.log(reader.error);
//       };
//     }
//     dispatch(FeatureAction.ShowModalAddPost(false))
//     dispatch(FeatureAction.Show_ModalPreviewImages(true))
//   }


//   return (
//     <>

//       {isModalConfirm && <ModalConfirm />}


//       {IsModalPreviewImages && <ModalPreviewImages />}

//     </>
//   )
// }

// export default AddPost
