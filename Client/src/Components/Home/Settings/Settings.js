import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Header, Footer, SettingsSide, EditProfile,
  Changepassword, AppsAndWebsite, EmailNotification,
  MangeContacts, PrivacyAndSecurity, Ads
} from '../../Exports';

const Settings = () => {
  const { link } = useParams();
  return (
    <div>
      <Header />
      <div className='min-h-[90vh] mt-24 container px-0 max-w-5xl bg-white border'>
        <div className='grid grid-cols-6 gap-6 h-full'>
          <div className='col-span-2 h-full border-r'>
            <SettingsSide />
          </div>
          <div className='col-span-4'>
            {(link === 'edit') && <EditProfile />}
            {(link === 'changepassword') && <Changepassword />}
            {(link === 'manage_access') && <AppsAndWebsite />}
            {(link === 'email_settings') && <EmailNotification />}
            {/* {(link === 'push_settings') && <Pus />} */}
            {(link === 'contact_history') && <MangeContacts />}
            {(link === 'privacy_and_security') && <PrivacyAndSecurity />}
            {(link === 'ads') && <Ads />}
            {/* {(link === 'login_activity') && < />} */}
            {/* {(link === 'emails_sent') && <EditProfile />} */}
            {/* {(link === 'help') && <EditProfile />} */}
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <Footer />
      </div>
    </div>
  )
}

export default Settings
