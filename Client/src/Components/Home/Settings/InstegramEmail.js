import React, { useState } from 'react';

const InstegramEmail = () => {
  const [security, setSecurity] = useState(true);
  const [other, setOther] = useState(false);
  const OpenSecurity = () => {
    setSecurity(true);
    setOther(false);
  };
  const openOther = () => {
    setSecurity(false);
    setOther(true);
  };
  const Security = () => {
    return (
      <div>
        <p className="my-5 text-gray-500">
          Security and login emails from Instagram in the last 14 days will
          appear here. You can use it to verify which emails are real and which
          are fake.
        </p>
      </div>
    );
  };

  const Other = () => {
    return (
      <div>
        <p className="my-5 text-gray-500">
          Other emails from Instagram in the last 14 days that aren't about
          security or login will appear here. You can use it to verify which
          emails are real and which are fake.
        </p>
      </div>
    );
  };
  return (
    <div className="container max-w-2xl mt-14">
      <p className="text-2xl font-medium text-gray-800">
        Emails From Instagram
      </p>
      <div className="grid grid-cols-2 justify-center items-center mt-10 text-center">
        <button
          onClick={OpenSecurity}
          className={security && ' border-b-2 border-black'}
        >
          Security
        </button>
        <button
          onClick={openOther}
          className={other && ' border-b-2 border-black'}
        >
          Other
        </button>
      </div>
      <hr />
      {security && <Security />}
      {other && <Other />}
    </div>
  );
};

export default InstegramEmail;
