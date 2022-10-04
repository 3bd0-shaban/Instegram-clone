import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { InstegramFont, Footer } from '../Exports';
// import { dispatchLogin } from '../Redux/Actions/authAction';
// import {useDispatch} from 'react-redux'
import { AiFillFacebook } from 'react-icons/ai';
import axios from 'axios';
const SignIn = () => {
    const [values, setValues] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    // const dispatch = useDispatch();
    const handleChange = ({ currentTarget: input }) => {
      setValues({ ...values, [input.name]: input.value });
    };
    const navigate = useNavigate();
    // useEffect(() => {
    //   if (localStorage.getItem("authToken")) {
    //     navigate("/");
    //   }
    // })
    const handleValidation = () => {
      const { password, email } = values;
      if (!email || !password) {
        return setError("Please Fill All Inputes");
      }
      return true;
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
      const config = {
        header: {
          "Content-Type": "application/json"
        },
      };
      if (handleValidation()) {
        const { email, password } = values;
        try {
          const { data } = await axios.post('/api/auth/signin', {
            email,
            password
          }, config);
          localStorage.setItem("LogedIn?", true);
          localStorage.setItem("authToken", data.token);
          // dispatch(dispatchLogin());
          navigate("/");
        } catch (error) {
          setError(error.response.data.msg);
          setTimeout(() => {
            setError("");
          }, 10000);
        }
      }
    };
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
                            <input type='email' onChange={handleChange} name='email' className='inputfield' placeholder='Phone number username,or email' />
                            <input type='password' onChange={handleChange} name='password' className='inputfield' placeholder='Password' />
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
                            {error && <span className="text-red-500 pb-3 font-poppins font-medium">{error}</span>}
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
