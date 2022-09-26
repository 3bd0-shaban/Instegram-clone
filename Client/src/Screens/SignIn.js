import React from 'react'
import { Link } from 'react-router-dom';
import { InstegramFont, Footer } from '../Exports'
import { AiFillFacebook } from 'react-icons/ai'
const SignIn = () => {
    return (
        <div>
            <div className='container max-w-4xl flex place-content-center h-[80%] mt-28 mb-28'>
                <div className='hidden md:block '>
                    <img src='Images/insta.png' className='w-full' alt='' />
                </div>
                <div className='container  max-w-md md:mt-20'>
                    <div className='md:border border-gray-300 px-12 items-center text-center md:bg-white'>
                        <Link to="/"><p className="py-10 instalogo"><InstegramFont /></p></Link>
                        <form className='flex flex-col'>
                            <input type='email' className='inputfield' placeholder='Phone number username,or email' />
                            <input type='password' className='inputfield' placeholder='Password' />
                            <button className='btn-primary'>Log In</button>
                            <div className='flex justify-center mt-4'>
                                <hr className='w-[40%] mt-3'></hr>
                                <p className='mx-3 font-semibold text-gray-500'>OR</p>
                                <hr className='w-[40%] mt-3'></hr>
                            </div>
                            <button className='flex mx-auto pt-5 mb-3 ' >
                                <div className='mt-1 text-blue-700 focus:text-blue-300 text-xl'>
                                    <AiFillFacebook />
                                </div>
                                <p className=' focus:text-blue-300 ml-2 text-base text-blue-900 font-medium'>Log in with facebook</p>
                            </button>
                            <Link to='forgetpassword' className='text-blue-800 focus:text-blue-300 md:mb-7 text-sm mt-2'>Forgot password ?</Link>
                        </form>
                    </div>
                    <div className='md:border border-gray-300 justify-center flex mt-5 md:bg-white'>
                        <p className="py-5 inline">Don't have an account? <Link to="/signup" className='font-semibold text-blue-400'>SignUp</Link></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SignIn
