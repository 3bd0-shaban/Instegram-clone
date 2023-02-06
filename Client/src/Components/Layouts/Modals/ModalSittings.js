import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { motion } from 'framer-motion';
import AnimModal from '../../../Animation/AnimModal';
import { Link } from 'react-router-dom';

const ModalSittings = (props) => {
    const { isModalSittings } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    useEffect(() => {
        const body = document.querySelector('body');
        body.style.overflow = isModalSittings ? 'hidden' : 'auto';
    }, [isModalSittings]);

    return (
        isModalSittings && <>

            <div onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} className="fixed inset-0 bg-black/30 z-10"></div>

            <motion.div
                variants={AnimModal}
                initial='initial'
                animate='animate'
                exit='exit'
                className='Modal !top-[10%] !max-h-[50rem] !overflow-hidden '
            >

                <div className='space-y-5 w-full text-center mx-auto py-6'>
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/edit' className='block cursor-pointer'>Change Password</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/changepassword' className='block cursor-pointer'>QR Code</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/manage_access' className='block cursor-pointer'>Apps and Websites</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/email_settings' className='block cursor-pointer'>Notifications</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/privacy_and_security' className='block cursor-pointer'>Privacy and scurity</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/contact_history' className='block cursor-pointer'>Mange Contacts</Link><hr />
                    {/* <Link to='/settings/edit' className='block cursor-pointer'>Login activity</Link><hr /> */}
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/emails_sent' className='block cursor-pointer'>Emails from Instegram</Link><hr />
                    {/* <Link to='/settings/edit' className='block cursor-pointer'>Report a propblem</Link><hr /> */}
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/settings/ads' className='block cursor-pointer'>Ads</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} to='/logout' className='block cursor-pointer'>Log Out</Link><hr />
                    <Link onClick={() => dispatch(FeatureAction.Show_iSModalSittings(false))} className='block cursor-pointer focus:bg-gray-500'>Cancel</Link>
                </div>
            </motion.div>
        </>
    )
}

export default ModalSittings
