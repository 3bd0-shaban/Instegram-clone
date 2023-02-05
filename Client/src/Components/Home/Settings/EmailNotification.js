import React from 'react';

const EmailNotification = () => {
  return (
    <div className="container max-w-3xl mt-20">
      <div className='my-8'>
        <p className="text-xl font-semibold my-3">Feedback Emails</p>
        <div className="flex gap-5 items-center">
          <input type="radio" className="block my-3 p-2" />
          <p className="font-medium">OFF</p>
        </div>
        <div className="flex gap-5 items-center mb-5">
          <input type="radio" className="block my-3 p-2" />
          <p className="font-medium">ON</p>
        </div>
        <span className="text-gray-500 my-3">Give feedback on Instagram.</span>
        <hr />
      </div>

      <div className='my-8'>
        <p className="text-xl font-semibold my-3">Reminder Emails</p>
        <div className="flex gap-5 items-center">
          <input type="radio" className="block my-3 p-2" />
          <p className="font-medium">OFF</p>
        </div>
        <div className="flex gap-5 items-center mb-5">
          <input type="radio" className="block my-3 p-2" />
          <p className="font-medium">ON</p>
        </div>
        <span className="text-gray-500 my-3">Get notifications you may have missed.</span>
        <hr />
      </div>

      <div className='my-8'>
        <p className="text-xl font-semibold my-3">Product Emails</p>
        <div className="flex gap-5 items-center">
          <input type="radio" className="block my-3 p-2" />
          <p className="font-medium">OFF</p>
        </div>
        <div className="flex gap-5 items-center mb-5">
          <input type="radio" className="block my-3 p-2" />
          <p className="font-medium">ON</p>
        </div>
        <span className="text-gray-500 my-3">Get tips and resources about Instagram's tools.</span>
        <hr />
      </div>

      <div className='my-8'>
        <p className="text-xl font-semibold my-3">News Emails</p>
        <div className="flex gap-5 items-center">
          <input type="radio" className="block my-3 p-2" />
          <p className="font-medium">OFF</p>
        </div>
        <div className="flex gap-5 items-center mb-5">
          <input type="radio" className="block my-3 p-2" />
          <p className="font-medium">ON</p>
        </div>
        <span className="text-gray-500 my-3">Learn about new Instagram features.</span>
        <hr />
      </div>

      <div className='my-8'>
        <p className="text-xl font-semibold my-3">Support Emails</p>
        <div className="flex gap-5 items-center">
          <input type="radio" className="block my-3 p-2" />
          <p className="font-medium">OFF</p>
        </div>
        <div className="flex gap-5 items-center mb-5">
          <input type="radio" className="block my-3 p-2" />
          <p className="font-medium">ON</p>
        </div>
        <span className="text-gray-500 my-3">Get updates on reports and violations of our Community Guidelines.</span>
      </div>
    </div>
  );
};

export default EmailNotification;
