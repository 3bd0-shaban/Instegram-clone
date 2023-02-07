import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';
import { Link } from 'react-router-dom';

const ModalSittings = (props) => {
    const { isModalSittings } = useSelector(state => state.Features);
    const dispatch = useDispatch();

    return (
        isModalSittings && <>

            <div onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} className="fixed inset-0 bg-black/30 z-20"></div>

            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='fixed inset-x-0 container px-0 z-40 bg-white w-full rounded-xl shadow drop-shadow-xl top-[10%] max-h-[50rem] !overflow-hidden max-w-xs sm:max-w-[30rem]  '
            >

                <div className='w-full text-center '>
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/edit' className='block hover:bg-gray-100 py-4 cursor-pointer'>Change Password</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/changepassword' className='block hover:bg-gray-100 py-4 cursor-pointer'>QR Code</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/manage_access' className='block hover:bg-gray-100 py-4 cursor-pointer'>Apps and Websites</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/email_settings' className='block hover:bg-gray-100 py-4 cursor-pointer'>Notifications</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/privacy_and_security' className='block hover:bg-gray-100 py-4 cursor-pointer'>Privacy and scurity</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/contact_history' className='block hover:bg-gray-100 py-4 cursor-pointer'>Mange Contacts</Link><hr />
                    {/* <Link to='/settings/edit' className='block hover:bg-gray-100 cursor-pointer'>Login activity</Link><hr /> */}
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/emails_sent' className='block hover:bg-gray-100 py-4 cursor-pointer'>Emails from Instegram</Link><hr />
                    {/* <Link to='/settings/edit' className='block hover:bg-gray-100 cursor-pointer'>Report a propblem</Link><hr /> */}
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/ads' className='block hover:bg-gray-100 py-4 cursor-pointer'>Ads</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/logout' className='block hover:bg-gray-100 py-4 cursor-pointer'>Log Out</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} className='block hover:bg-gray-100 py-4 cursor-pointer focus:bg-gray-200'>Cancel</Link>
                </div>
            </motion.div>
        </>
    )
}

export default ModalSittings
