import React, { useState } from 'react'
import { useGetUserQuery, useUpdateUserInfoMutation } from '../../../Redux/APIs/UserApi'
import { ImSpinner7 } from 'react-icons/im';
import { FeatureAction } from '../../../Redux/Slices/FeaturesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ModalChangeProfile, useTitle } from '../../Exports';

const EditProfile = () => {
  useTitle('Change Password')
  const { data: userInfo } = useGetUserQuery() || {};
  const [UpdateUserInfo, { isFetching, isError, error }] = useUpdateUserInfoMutation();
  const { isModalChangeProfile } = useSelector(state => state.Features)
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState()
  const [username, setUsername] = useState()
  const [website, setWebsite] = useState()
  const [bio, setBio] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [gender, setGender] = useState()

  const UpdateHandler = (e) => {
    e.preventDefault();
    const data = { fullname, username, website, bio, email, phoneNumber, gender }
    UpdateUserInfo(data).unwrap()
      .then(payload => {
        setFullname();
        setUsername();
        setEmail();
        setWebsite();
        setBio();
        setPhoneNumber();
        setGender();
      })
      .catch(err => console.log(err?.data?.msg))
  }
  return (
    <>
      {isModalChangeProfile && (
        <ModalChangeProfile
          onClose={() => dispatch(FeatureAction.setIsModalChangeProfile(false))}
        />
      )}
      <div className="container max-w-3xl mb-8">
        <form className="w-full grid grid-cols-6 items-center justify-start text-start">
          <img
            className="col-span-2 h-28 max-w-[28rem] rounded-full flex justify-center items-center"
            src={userInfo?.avatar?.url}
            alt=""
          />
          <div className="col-span-4">
            <p className="text-lg font-semibold">{userInfo?.username}</p>
            <button
              type="button"
              onClick={() =>
                dispatch(FeatureAction.setIsModalChangeProfile(true))
              }
              className="text-blue-400 font-semibold"
            >
              Change profile photo
            </button>
          </div>
        </form>
      </div>

      <form
        onSubmit={UpdateHandler}
        className="container max-w-3xl space-y-5 mb-8"
      >
        <div className="w-full grid grid-cols-6 justify-start text-start">
          <label className="col-span-2 font-medium">Username</label>
          <div className="col-span-4 w-full flex gap-x-10 items-center justify-start text-start">
            <div className="w-full">
              <input
                type="text"
                onChange={(e) => setFullname(e.target.value)}
                defaultValue={userInfo?.fullname}
                name="fullname"
                className="border outline-none py-3 w-full px-3 rounded-md"
                placeholder="Fullname"
              />
              <p className="my-2 text-sm text-gray-500">
                Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name.
              </p>
              <p className="my-2 text-sm text-gray-500">
                You can only change your name twice within 14 days.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-6 justify-start text-start">
          <label className="col-span-2 font-medium">Username</label>
          <div className="col-span-4 w-full flex gap-x-10 items-center justify-start text-start">
            <div className="w-full">
              <input
                type="text"
                defaultValue={userInfo?.username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                className="border outline-none py-3 w-full px-3 rounded-md"
                placeholder="Fullname"
              />
              <p className="my-2 text-sm text-gray-500">
                In most cases, you'll be able to change your username back to
                3bdo9100 for another 14 days.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-6 justify-start text-start">
          <label className="col-span-2 font-medium">Website</label>
          <div className="col-span-4 w-full flex gap-x-10 items-center justify-start text-start">
            <div className="w-full">
              <input
                type="text"
                disabled
                onChange={(e) => setWebsite(e.target.value)}
                name="website"
                className="border outline-none py-3 w-full px-3 rounded-md"
                placeholder="Website"
              />
              <p className="my-2 text-sm text-gray-500">
                Editing your links is only available on mobile. Visit the
                Instagram app and edit your profile to change the websites in
                your bio.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-6 justify-start text-start">
          <label className="col-span-2 font-medium">Bio</label>
          <div className="col-span-4 w-full flex gap-x-10 items-center justify-start text-start">
            <div className="w-full">
              <textarea
                defaultValue={userInfo?.bio}
                onChange={(e) => setBio(e.target.value)}
                name="bio"
                className="border outline-none py-3 w-full px-3 rounded-md"
                placeholder="Bio"
              />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-6 justify-start items-end text-start">
          <label className="col-span-2 font-medium">Website</label>
          <div className="col-span-4 w-full flex gap-x-10 items-center justify-start text-start">
            <div className="w-full">
              <p className="my-2 text-base font-medium text-gray-500">
                Personal information
              </p>
              <p className="my-2 text-sm text-gray-500">
                Provide your personal information, even if the account is used
                for a business, a pet or something else. This won't be a part of
                your public profile.
              </p>
              <input
                type="email"
                defaultValue={userInfo?.email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="border outline-none py-3 w-full px-3 my-3 rounded-md"
                placeholder="Website"
              />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-6 justify-start items-center text-start">
          <label className="col-span-2 font-medium">Phone number</label>
          <div className="col-span-4 w-full flex gap-x-10 items-center justify-start text-start">
            <div className="w-full">
              <input
                type="tel"
                defaultValue={userInfo?.phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                name="phoneNumber"
                className="border outline-none py-3 w-full px-3 rounded-md"
                placeholder="Phone Number"
              />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-6 justify-start items-center text-start">
          <label className="col-span-2 font-medium">Male</label>
          <div className="col-span-4 w-full flex gap-x-10 items-center justify-start text-start">
            <div className="w-full">
              <input
                defaultValue={userInfo?.gender}
                onChange={(e) => setGender(e.target.value)}
                name="gender"
                className="border outline-none py-3 w-full px-3 rounded-md"
                placeholder="Gender"
              />
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-6 justify-start items-center text-start">
          <label className="col-span-2 font-medium">
            Similar account suggestions
          </label>
          <div className="col-span-4 w-full flex gap-x-10 justify-start text-start">
            <div className="w-full flex items-start gap-4">
              <input type="radio" className="mt-3" />
              <p>
                Include your account when recommending similar accounts people
                might want to follow
              </p>
            </div>
          </div>
        </div>
        <button className="btn-primary px-8" disabled={isFetching}>
          {isFetching ? (
            <span className="flex justify-center items-center animate-spin">
              <ImSpinner7 />
            </span>
          ) : (
            'Submit'
          )}
        </button>
        {isError && (
          <p className="text-sm font-medium text-red-500">{error?.data?.msg}</p>
        )}
      </form>
    </>
  );
}

export default EditProfile
