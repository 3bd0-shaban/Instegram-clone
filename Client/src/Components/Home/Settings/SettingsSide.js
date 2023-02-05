import React from 'react';
import { Link, useParams } from 'react-router-dom';

const SettingsSide = () => {
  const { link } = useParams();
  const SideHeads = (props) => {
    return (
      <Link to={`/settings/${props.HeadLink}`} className="w-full block">
        <span
          className={`p-4 px-6 w-full block hover:bg-gray-100 ${
            link === props.HeadLink && 'border-l-4 border-black duration-300'
          }`}
        >
          <p className="text-lg">{props.Title}</p>
        </span>
      </Link>
    );
  };

  return (
    <div className="relative h-full">
      <SideHeads Title="Edit Profile" HeadLink="edit" />
      <SideHeads Title="Change Password" HeadLink="changepassword" />
      <SideHeads Title="Apps and websites" HeadLink="manage_access" />
      <SideHeads Title="Email Notifications" HeadLink="email_settings" />
      {/* <SideHeads Title='Push Notifications' HeadLink='push_settings' /> */}
      <SideHeads Title="Mange Contacts" HeadLink="contact_history" />
      <SideHeads Title="Privacy and security" HeadLink="privacy_and_security" />
      <SideHeads Title="Ads" HeadLink="ads" />
      {/* <SideHeads Title='Login Activity' HeadLink='login_activity' /> */}
      <SideHeads Title="Emails from instegram" HeadLink="emails_sent" />
      {/* <SideHeads Title='Help' HeadLink='help' /> */}
      <div className="absolute bottom-0">
        <hr />
        <div className="p-5">
          <p>Meta</p>
          <p className="text-blue-500 font-semibold text-lg my-4">
            Account Center
          </p>
          <p className='text-gray-400'>
            Control settings for connected experiences across Instagram, the
            Facebook app and Messenger, including story and post sharing and
            logging in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsSide;
