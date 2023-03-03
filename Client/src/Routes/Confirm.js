import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { InstegramFont, Footer } from '../Components/Exports';

import { useRequestOTP2Mutation, useVerifyEmailMutation } from '../Redux/APIs/AuthApi';
import { ImSpinner7 } from 'react-icons/im';
const Confirm = () => {
    const [code, setCode] = useState('');
    const [success, setSuccess] = useState('');
    const userRef = useRef();
    useEffect(() => {
        userRef.current.focus()
    }, []);

    const navigate = useNavigate();
    const [SearchQuery] = useSearchParams();
    const email = SearchQuery.get('email');

    const [VerifyEmail, { isLoading, isError, error }] = useVerifyEmailMutation();
    const [RequestOTP2, { isError: isErrorReq2opt, error: errorReq2opt }] = useRequestOTP2Mutation();

    const SubmitActivateEmail = async (event) => {
        event.preventDefault();
        await VerifyEmail({ code, email }).unwrap()
            .then(() => {

                navigate(`/birthday?email=${email}`)
                setCode('');
            })
    }
    const RequestOTP2Activate = async (event) => {
        event.preventDefault();
        const data = { email }
        await RequestOTP2(data).unwrap()
            .then(payload => {
                setSuccess(`A new confirmation code send to ${email}`)
            }).catch(err => {
                console.log(err?.data?.msg)
            })
    }
    return (
        <>
            <div className='container px-5 max-w-5xl flex gap-1 place-content-center mt-[2rem] md:mt-[6rem] mb-5 md:mb-28'>
                <div className='hidden md:flex justify-center'>
                    <img src={`Images/insta.png` || 'https://res.cloudinary.com/abdo9/image/upload/v1676229228/insta_jwyqco.png'} className='w-[85%] mt-8' alt='' />
                </div>
                <div className='container px-3 max-w-md md:mt-16'>
                    <div className='md:border rounded-lg md:py-10 border-gray-300 md:max-w-[90%] xsm:px-5 md:px-10 items-center text-center md:bg-white'>
                        <Link to="/">
                            <p className="py-5 md:py-10 instalogo">
                                <InstegramFont />
                            </p>
                        </Link>
                        <div className='mb-5 space-y-2'>
                            <p className=' font-medium text-base'>Enter Configuration code</p>
                            <span>Enter the confirmation code we sent to {email}
                                <button
                                    onClick={RequestOTP2Activate}
                                    className='text-blue-500 font-semibold'>Resend Code
                                </button>
                            </span>
                        </div>
                        <form className='flex flex-col' onSubmit={SubmitActivateEmail}>
                            <div className='flex gap-3 '>
                                <input
                                    type='number'
                                    ref={userRef}
                                    onChange={(e) => setCode(e.target.value)}
                                    value={code}
                                    name='email'
                                    className='inputfield appearance-none !w-full'
                                    placeholder='Confirmation code' />
                            </div>
                            <button type='submit' className='btn-primary mt-4 !mb-4' disabled={isLoading}>
                                {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'>
                                    <ImSpinner7 />
                                </span> : 'Next'
                                }
                            </button>
                            <Link to='/signin' className='font-medium text-blue-500 text-md focus:text-blue-300 '>Go Back?</Link>
                            {(isError || isErrorReq2opt) &&
                                <span className="text-red-500 pb-3 font-poppins font-medium">
                                    {error?.data?.msg || errorReq2opt?.data?.msg}
                                </span>
                            }
                            {success &&
                                <span className="text-green-500 pb-3 font-poppins font-medium">
                                    {success}
                                </span>
                            }
                        </form>
                    </div>
                    <div className='md:border rounded-lg max-w-[90%] border-gray-300 justify-center flex mt-5 md:bg-white'>
                        <p className="py-5 inline">have an account?
                            <Link to="/signin" className='font-semibold text-blue-400'>Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex text-center justify-center mx-auto max-w-xs'>
                <img src='/images/Meta.png' className='h-16' alt=''></img>
            </div>
            <Footer />
        </>
    )
}

export default Confirm
