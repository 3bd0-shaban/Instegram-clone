import React from 'react'
import { MdOutlineError } from 'react-icons/md'
import { IoEyeSharp } from 'react-icons/io5'
export const Danger = (props) => {
  return (
    <div className={props.className}>
      <div id="alert-additional-content-2" className="p-4 mb-4 border border-red-300 rounded-lg bg-red-50 dark:bg-red-200" role="alert">
        <div className="flex gap-2 items-center text-red-900 text-xl">
          <MdOutlineError />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium text-red-900 dark:text-red-800">{props.error}</h3>
        </div>
        <div className="mt-2 mb-4 text-sm text-red-900 dark:text-red-800"></div>
        <div className="flex ml-7">
          <button type="button" className="text-white gap-2 bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center">
            <IoEyeSharp style={{ fontSize: '1.2rem' }} />View more
          </button>
          <button type="button" className="text-red-900 bg-transparent border border-red-900 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
};
export const Warning = (props) => {
  return (
    <div className={props.className}>
      <div id="alert-additional-content-2" className="p-4 mb-4 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-yellow-200" role="alert">
        <div className="flex gap-2 items-center text-yellow-900 text-xl">
          <MdOutlineError />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium text-yellow-900">{props.error}</h3>
        </div>
        <div className="mt-2 mb-4 text-sm text-yellow-900 "></div>
        <div className="flex ml-7">
          <button type="button" className="text-white gap-2 bg-yellow-900 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center">
            <IoEyeSharp style={{ fontSize: '1.2rem' }} />View more
          </button>
          <button type="button" className="text-yellow-900 bg-transparent border border-yellow-900 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
export const Success = (props) => {
  return (
    <div className={props.className}>
      <div id="alert-additional-content-2" className="p-4 mb-4 border border-green-300 rounded-lg bg-green-50 dark:bg-green-200" role="alert">
        <div className="flex gap-2 items-center text-green-900 text-xl">
          <MdOutlineError />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium text-green-900">{props.error}</h3>
        </div>
        <div className="mt-2 mb-4 text-sm text-green-900"></div>
        <div className="flex ml-7">
          <button type="button" className="text-white gap-2 bg-green-900 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center">
            <IoEyeSharp style={{ fontSize: '1.2rem' }} />View more
          </button>
          <button type="button" className="text-green-900 bg-transparent border border-green-900 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}


export const ToastSucces = (props) => {
  return (
    <>
        <div className="absolute left-[43%] bottom-10 bg-green-200 text-green-500 font-semibold text-xl px-10 py-4 border-r-8 border-blue-500 drop-shadow-lg z-50">
        <p className="text-base">
          <span className="mr-2 inline-block px-3 rounded-full bg-blue-500 text-white font-extrabold py-1">i</span>
          {props.Message}
        </p>
      </div>
    </>
  )
}
export const Toasterror = (props) => {
  return (
    <>
      <div className="absolute left-[43%] bottom-10 bg-red-200 text-red-500 font-semibold text-xl px-10 py-4 border-r-8 border-blue-500 drop-shadow-lg z-50">
        <p className="text-base">
          <span className="mr-2 inline-block px-3 rounded-full bg-blue-500 text-white font-extrabold py-1">i</span>
          {props.Message}
        </p>
      </div>
    </>
  )
}