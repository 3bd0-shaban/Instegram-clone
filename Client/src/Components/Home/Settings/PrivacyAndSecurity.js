import React from 'react';

const PrivacyAndSecurity = () => {
  return (
    <div className="container max-w-3xl mt-10">
      <p className="my-5 text-2xl font-semibold">Account privacy</p>
      <div className="flex gap-3 items-center py-2">
        <input type="checkbox" className="p-10 ml-1" />
        <p className="text-lg">Private Account</p>
      </div>
      <p className="my-5 text-gray-500">
        When your account is public, your profile and posts can be seen by
        anyone, on or off Instagram, even if they don’t have an Instagram
        account.
      </p>
      <p className="my-5 text-gray-500">
        When your account is private, only the followers you approve can see
        what you share, including your photos or videos on hashtag and location
        pages, and your followers and following lists.
      </p>

      <hr />

      <p className="my-5 text-2xl font-semibold">Activity Status</p>
      <div className="flex gap-3 items-center py-2">
        <input type="checkbox" className="p-10 ml-1" />
        <p className="text-lg">Private Account</p>
      </div>
      <p className="my-5 text-gray-500">
        Allow accounts you follow and anyone you message to see when you were
        last active or are currently active on Instagram apps. When this is
        turned off, you won't be able to see the Activity Status of other
        accounts.
      </p>
      <p className="my-5 text-gray-500">
        You can continue to use our services if active status is off.
      </p>
      <hr />

      <p className="my-5 text-2xl font-semibold">Story</p>
      <p className="my-5 font-medium text-blue-400">
        Edit Story Settings
      </p>

      <hr />
    </div>
  );
};

export default PrivacyAndSecurity;
