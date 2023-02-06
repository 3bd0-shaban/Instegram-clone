import React from 'react';
import { useParams } from 'react-router-dom';
import {
  SideBar,
  Footer,
  SettingsSide,
  EditProfile,
  Changepassword,
  AppsAndWebsite,
  EmailNotification,
  MangeContacts,
  PrivacyAndSecurity,
  InstegramEmail,
  Ads,
} from '../../Exports';

const Settings = () => {
  const { link } = useParams();
  return (
    <div className='bg-white'>
      <SideBar />
      <div className="min-h-[90vh] container px-0 max-w-5xl bg-white border mt-0 lg:mt-0 xl:mr-60 xxxl:mr-[26rem]">
        <div className="grid grid-cols-6 gap-6 min-h-[90vh]">
          <div className="col-span-2 min-h-[90vh] border-r hidden lg:block">
            <SettingsSide />
          </div>
          <div className="col-span-6 lg:col-span-4">
            {link === 'edit' && <EditProfile />}
            {link === 'changepassword' && <Changepassword />}
            {link === 'manage_access' && <AppsAndWebsite />}
            {link === 'email_settings' && <EmailNotification />}
            {/* {(link === 'push_settings') && <Pus />} */}
            {link === 'contact_history' && <MangeContacts />}
            {link === 'privacy_and_security' && <PrivacyAndSecurity />}
            {link === 'ads' && <Ads />}
            {/* {(link === 'login_activity') && < />} */}
            {(link === 'emails_sent') && <InstegramEmail />}
            {/* {(link === 'help') && <EditProfile />} */}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Settings;
