import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { InstegramFont, Footer, usePersist } from '../Components/Exports';
import { AiFillFacebook } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useSigninMutation } from '../Redux/APIs/AuthApi';
import { setCredentials } from '../Redux/Slices/UserSlice';
import { ImSpinner7 } from 'react-icons/im';
const SignIn = () => {
  const dispatch = useDispatch();
  const [persist, setPersist] = usePersist()
  const userRef = useRef();
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const handleChange = ({ currentTarget: input }) => {
    setInputs({ ...inputs, [input.name]: input.value });
  };
  const navigate = useNavigate();
  const HandleToggle = () => {
    setPersist(prev => !prev)
  }
  const [signin, { isLoading, isError, error }] = useSigninMutation();
  useEffect(() => {
    userRef.current.focus()
  }, []);
  useEffect(() => {
    userRef.current.focus()
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = inputs;
    const data = { email, password }
    try {
      const { accessToken } = await signin(data).unwrap()
      dispatch(setCredentials({ accessToken }));
      setInputs({ email: '', password: '' });
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='container max-w-4xl flex place-content-center h-[80%] mt-28 mb-28'>
        <div className='hidden md:block '>
          <img src='Images/insta.png' className='w-full' alt='' />
        </div>
        <div className='container  max-w-md md:mt-20'>
          <div className='md:border border-gray-300 px-12 items-center text-center md:bg-white'>
            <Link to="/"><p className="py-10 instalogo"><InstegramFont /></p></Link>
            <form className='flex flex-col' onSubmit={handleSubmit}>
              <input type='email' ref={userRef} onChange={handleChange} name='email' className='inputfield' placeholder='Phone number username,or email' />
              <input type='password' onChange={handleChange} name='password' className='inputfield' placeholder='Password' />
              <button type='submit' className='btn-primary mt-4 !mb-8' disabled={isLoading}>
                {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Sign Up'}</button>
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
              <label htmlFor='persist' className='flex gap-4'>
                <input type='checkbox' id='persist' onChange={HandleToggle} checked={persist} />
                Remmber ME
              </label>
              <Link to='forgetpassword' className='text-blue-800 focus:text-blue-300 md:mb-7 text-sm mt-2'>Forgot password ?</Link>
              {isError && <span className="text-red-500 pb-3 font-poppins font-medium">{error?.data?.msg}</span>}
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
