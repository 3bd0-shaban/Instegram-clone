import React, { useState } from 'react';

const AppsAndWebsite = () => {
  const [active, setActive] = useState(true);
  const [expired, setExpired] = useState(false);
  const [removed, setRemoed] = useState(false);
  const openActive = () => {
    setActive(true);
    setExpired(false);
    setRemoed(false);
  };
  const OpenExpired = () => {
    setActive(false);
    setExpired(true);
    setRemoed(false);
  };
  const OpenRemoved = () => {
    setActive(false);
    setExpired(false);
    setRemoed(true);
  };

  const Active = () => {
    return (
      <div>
        <p className="my-5">
          These are apps and websites you've connected to your Instagram
          account. They can access non-public information that you choose to
          share with them
        </p>
        <p className="text-gray-500">
          You have not authorized any applications to access your Instagram
          account.
        </p>
      </div>
    );
  };

  const Expired = () => {
    return (
      <div>
        <p className="my-5">
          These are apps and websites you've connected to your Instagram account
          that you may not have used in the last 90 days. They're no longer able
          to access your non-public information, but may still have the
          information you shared while they were active. "Non-public" means
          information that an app can only access if you choose to share it when
          you log in with your Instagram account (like your email address).
        </p>
        <p className="text-gray-500">
          You have no expired applications that had access to your Instagram
          account.
        </p>
      </div>
    );
  };
  const Removed = () => {
    return (
      <div>
        <p className="my-5">
          These are apps and websites that are no longer connected to your
          Instagram account. They can't access your non-public information
          anymore, but may still have the information you shared while they were
          active. "Non-public" means information that an app can only access if
          you choose to share it when you log in with your Instagram account
          (like your email address). You can ask an app to delete your
          information. To do it, review their Privacy Policy for details and
          contact information. If you contact an app, they may need your User
          ID.
        </p>
        <p className="text-gray-500">
          You have no removed applications that had access to your Instagram
          account.
        </p>
      </div>
    );
  };
  return (
    <div className="container max-w-2xl mt-20">
      <p className="text-2xl font-medium text-gray-800">Apps and Websites</p>
      <div className="grid grid-cols-3 justify-center items-center mt-10 text-center">
        <button
          onClick={openActive}
          className={`${active && ' border-b-2 border-black'}`}
        >
          Active
        </button>
        <button
          onClick={OpenExpired}
          className={`${expired && ' border-b-2 border-black'}`}
        >
          Expired
        </button>
        <button
          onClick={OpenRemoved}
          className={`${removed && ' border-b-2 border-black'}`}
        >
          Removed
        </button>
      </div>
      <hr />
      {active && <Active />}
      {expired && <Expired />}
      {removed && <Removed />}
    </div>
  );
};

export default AppsAndWebsite;
