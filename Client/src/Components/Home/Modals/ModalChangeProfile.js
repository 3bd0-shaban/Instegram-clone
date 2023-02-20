import { AnimatePresence, motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';
import { BsX } from 'react-icons/bs';
import { useUpdateProfilePicMutation } from '../../../Redux/APIs/UserApi';
import { useState, useEffect } from 'react';
import { selectCurrentToken, setCredentials } from '../../../Redux/Slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
const ModalChangeProfile = ({ onClose, loading }) => {
    const [UpdateProfilePic, { isLoading }] = useUpdateProfilePicMutation();
    const accessToken = useSelector(selectCurrentToken)
    const [avatar, setAvatar] = useState();
    const dispatch = useDispatch()
    const loadFile = (e) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setAvatar(reader.result);
            };
        }
    };
    const UploadPhotoHandler = async () => {
        const data = { avatar };
        const { user } = await UpdateProfilePic(data).unwrap();
        if (user) {
            dispatch(setCredentials({ accessToken, user }))
            dispatch(FeatureAction.setIsModalChangeProfile(false))
        }
    };
    useEffect(() => {
        if (avatar) {
            UploadPhotoHandler()
        }
        // eslint-disable-next-line 
    }, [avatar])
    return (
        <>
            <AnimatePresence>
                {isLoading && loading}
            </AnimatePresence>
            <div onClick={onClose} className="fixed inset-0 bg-black/30 z-20"></div>
            <motion.div
                variants={AnimModal}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed inset-x-0 space-y-5 top-[25%] container z-30 bg-white w-full rounded-xl shadow drop-shadow-xl !p-0 max-w-xs sm:max-w-[30rem]  "
            >
                <button onClick={onClose} className="absolute right-0 m-2">
                    <BsX size={25} />
                </button>
                <div className="w-full py-3 flex justify-center">
                    <p className="text-2xl">Change Profile Photo</p>
                </div>
                <hr />
                <form className="w-full text-center mx-auto !mt-0">
                    <label className="block cursor-pointer px-5 text-blue-500 font-medium focus:bg-gray-500 py-4 hover:bg-gray-100">
                        <p> Upload photo</p>
                        <input
                            onChange={loadFile}
                            id="dropzone-file"
                            type="file"
                            multiple
                            className="hidden"
                        />
                    </label>
                    <hr />
                    <span
                        className="block cursor-pointer px-5 text-red-500 font-medium focus:bg-gray-500 py-4 hover:bg-gray-100"
                        onClick={onClose}
                    >
                        Remove photo
                    </span>
                    <hr />
                    <span
                        className="block cursor-pointer px-5 focus:bg-gray-500 py-4 hover:bg-gray-100 hover:rounded-b-xl"
                        onClick={onClose}
                    >
                        Cancel
                    </span>
                </form>
            </motion.div>
        </>
    );
};

export default ModalChangeProfile;
