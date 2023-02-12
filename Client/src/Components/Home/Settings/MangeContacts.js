import React from 'react';

const MangeContacts = () => {
  return (
    <div className="container max-w-3xl mt-20">
      <p className="my-5 text-2xl font-semibold">Manage contacts</p>
      <p className="my-5">
        The people listed here are contacts you've uploaded to Instagram. To
        remove your synced contacts, tap Delete all. Your contacts will be
        re-uploaded the next time Instagram syncs your contacts unless you go to
        your device settings and turn off access to contacts.
      </p>
      <p className="my-5">
        Only you can see your contacts, but Instagram uses the info you've
        uploaded about your contacts to make friend suggestions for you and
        others and to provide a better experience for everyone.
      </p>
      <div className="flex justify-between py-3">
        <p className="font-meduim text-lg">0 Synced Contacts</p>
        <button className="text-blue-300" disabled={true}>
          Delete All
        </button>
      </div>
      <hr />
      <p className="my-8 text-lg">
        When you upload your contacts to Instagram, you'll see them here.
      </p>
      <hr />
      <button className="btn-primary px-8 my-5">Delete All</button>
    </div>
  );
};

export default MangeContacts;
