import React, { useState } from 'react';
import {
  useChangePasswordMutation,
} from '../../../Redux/APIs/AuthApi';
import { ImSpinner7 } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../Redux/Slices/UserSlice';

const Changepassword = () => {
  const userInfo = useSelector(selectCurrentUser)
  const [ChangePassword, { isFetching, isError, error }] = useChangePasswordMutation();
  const [success, setSuccess] = useState('');
  const [inputs, setInputs] = useState({
    oldpassword: '',
    newpassword: '',
    confirmpassword: '',
  });

  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };
  const HandleChangePassword = async (e) => {
    e.preventDefault();
    const { oldpassword, newpassword, confirmpassword } = inputs;
    const data = { oldpassword, newpassword, confirmpassword }
    ChangePassword(data).unwrap()
      .then(result => {
        setSuccess('Password changed succeessfully');
      }).catch(err => {
        console.log(err?.data?.msg);
      })
  }
  return (
    <>
      <div className="container max-w-xl mt-10 lg:mt-2">
        <div className="w-full grid grid-cols-6 items-center justify-start text-start">
          <img
            className="col-span-2 h-20 w-20 lg:h-28 lg:w-28 rounded-full flex justify-center items-center object-cover"
            src={userInfo?.avatar?.url ? userInfo?.avatar?.url: process.env.REACT_APP_DefaultIcon }
            alt={userInfo?.username}
          />
          <div className="col-span-4">
            <p className="text-lg font-semibold">{userInfo?.username}</p>
          </div>
        </div>
      </div>
      <form onSubmit={HandleChangePassword}>
        <div className="container px-3 max-w-xl mb-8">
          <div className="w-full grid grid-cols-6 justify-start items-center text-start">
            <label className="col-span-2 text-lg font-medium">Old password</label>
            <div className="col-span-4 w-full flex gap-x-10 items-center justify-start text-start">
              <div className="w-full">
                <input
                  type="password"
                  value={inputs.oldpassword}
                  onChange={handleChange}
                  name="oldpassword"
                  className="border outline-none py-3 w-full px-3 my-3 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-6 justify-start items-center text-start">
            <label className="col-span-2 text-lg font-medium">New Password</label>
            <div className="col-span-4 w-full flex gap-x-10 items-center justify-start text-start">
              <div className="w-full">
                <input
                  type="password"
                  value={inputs.newpassword}
                  onChange={handleChange}
                  name="newpassword"
                  className="border outline-none py-3 w-full px-3 my-3 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-6 justify-start items-center text-start">
            <label className="col-span-2 text-lg font-medium">
              Confirm New Password
            </label>
            <div className="col-span-4 w-full flex gap-x-10 items-center justify-start text-start">
              <div className="w-full">
                <input
                  type="password"
                  value={inputs.confirmpassword}
                  onChange={handleChange}
                  name="confirmpassword"
                  className="border outline-none py-3 w-full px-3 my-3 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-6 justify-start items-center text-start">
            <label className="col-span-2 text-lg font-medium"></label>
            <div className="col-span-4 w-full flex gap-x-10 items-center justify-start text-start">
              <div className="w-full my-7">
                <button type='submit' className="btn-primary px-8" disabled={isFetching}>
                  {isFetching ? (
                    <span className="flex justify-center items-center animate-spin">
                      <ImSpinner7 />
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
                {isError && (
                  <p className="text-sm font-medium text-red-500">
                    {error?.data?.msg}
                  </p>
                )}
                {success && (
                  <p className="text-sm font-medium text-green-500">
                    {success}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Changepassword;
