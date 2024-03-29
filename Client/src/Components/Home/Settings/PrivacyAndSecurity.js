import React from 'react';
import { useChangePrivacyMutation } from '../../../Redux/APIs/UserApi';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUser, setCredentials } from './../../../Redux/Slices/UserSlice';
import { useDispatch } from 'react-redux';

const PrivacyAndSecurity = () => {
  const [ChangePrivacy] = useChangePrivacyMutation()
  const userInfo = useSelector(selectCurrentUser)
  const accessToken = useSelector(selectCurrentToken)
  const dispatch = useDispatch()
  const HandleChangePrivacy = async () => {
    const user = await ChangePrivacy().unwrap()
    dispatch(setCredentials({ accessToken, user }))
  }

  return (
    <div className="container max-w-3xl mt-10">
      <p className="my-5 text-2xl font-semibold">Account privacy</p>
      <div className="flex gap-3 items-center py-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input onChange={HandleChangePrivacy} type="checkbox" value="" className="sr-only peer" />
          <div className={`rounded-full w-10 h-5 relative ${userInfo?.isprivat ? 'bg-blue-500' : 'bg-gray-200'}`}>
            <span className={`absolute w-5 h-5 bg-white rounded-full border ${userInfo?.isprivat ? 'right-0' : 'left-0'}`} />                                                            </div>
        </label>
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
