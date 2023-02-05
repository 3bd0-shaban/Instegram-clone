import React from 'react';

const Ads = () => {
  return (
    <div className="container max-w-3xl mt-8">
      <div>
        <p className="font-bold text-3xl">Ad topic</p>
        <p className="text-blue-400 my-3 text-lg">Ad topic prefrences</p>
        <hr />
      </div>
      <div className="my-5">
        <p className="font-bold text-2xl">Data from partners</p>
        <p className="font-bold text-xl text-gray-700 my-3">
          Choose whether we can use data from our partners to show you
          personalized ads.
        </p>
        <hr />
      </div>
      <div className="flex justify-between">
        <p>Use Data from Partners</p>

        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div
            className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
          peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peerpeer-checked:after:translate-x-full
           peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px]
            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
             peer-checked:bg-blue-600"
          ></div>

          <span className="ml-3 text-sm sr-only font-medium text-gray-900 ">
            Toggle me
          </span>
        </label>
      </div>
      <p className="my-5 text-gray-600">
        To show you relevant ads, we use data that advertisers and other
        partners provide to us about your activity on their websites and apps,
        as well as certain offline interactions, such as purchases. For example,
        we may show you an ad for a shirt based on your visit to a clothing
        website. We never sell your data. Learn More
      </p>
      <div>
        <p className="font-semibold my-4 text-xl">What You Should Know</p>
        <div>
          <p className="font-medium">
            This setting doesn't change the number of ads you'll see on
            Instagram.
          </p>
          <p className="ml-3 text-sm text-gray-500">
            If you turn off this setting, we'll still show you ads on Instagram,
            but they may not be as relevant to you.
          </p>
        </div>
        <div>
          <p className="font-medium">
            This setting controls how certain data is used.
          </p>
          <p className="ml-3 text-sm text-gray-500">
            This setting controls whether Instagram can show you personalized
            ads based on data about your activity from our partners. If you turn
            off this setting, the ads you see may still be based on your
            activity on our platform. They may also be based on information from
            a specific business that has shared a list of individuals or devices
            with us, if we've matched your profile to information on that list.
          </p>
        </div>
        <div className="font-medium">
          <p>Where this setting applies</p>
          <p className="ml-3 text-sm text-gray-500">
            This setting applies to ads you see on this Instagram account. If
            you have other Instagram accounts, you can access this setting on
            those accounts.
          </p>
        </div>
        <hr className="my-3" />
      </div>
      <p className="font-bold text-3xl">Ad topic</p>
      <div className='my-3'>
        <p className="font-medium">Your ad activity</p>
        <p className="ml-3 text-sm text-gray-500">
          See the ads you've recently interacted with and learn more about the
          brands behind them.
        </p>
      </div>
    </div>
  );
};

export default Ads;
