import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { InstegramFont, Footer, usePersist } from '../Components/Exports';
import { AiFillFacebook } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useBirthdayMutation } from '../Redux/APIs/AuthApi';
import { setCredentials } from '../Redux/Slices/UserSlice';
import { ImSpinner7 } from 'react-icons/im';
import { HiOutlineCake } from 'react-icons/hi';
const SignIn = () => {
    const dispatch = useDispatch();
    const userRef = useRef();
    const [inputs, setInputs] = useState({
        year: '',
        month: '',
        day: ''
    });

    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const navigate = useNavigate();
    const [SearchQuery] = useSearchParams();
    const email = SearchQuery.get('email');
    // const years = Array.from({length (1950 - 2023)/1+1},(_,i)=>1950 +(i*1))
    let years = []
    for (let i = 1950; i <= 2023; i++) {
        years = [i];
    }
    var months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    const [birhday, { isLoading, isError, error }] = useBirthdayMutation();
    useEffect(() => {
        userRef.current.focus()
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { year, month, day } = inputs;
        const data = { year, month, day }
        try {
            await birhday({ data, email }).unwrap()
            setInputs({ year: '', mmonth: '', day: '' });
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='container max-w-5xl flex place-content-center h-[80%] mt-28 mb-28'>
                <div className='hidden md:block '>
                    <img src='Images/insta.png' className='w-[95%] mt-8' alt='' />
                </div>
                <div className='container max-w-md md:mt-20'>
                    <div className='md:border font-semibold space-y-5 text-gray-500 border-gray-300 px-8 items-center text-center md:bg-white'>
                        <span to="/"><p className="py-10 text-gray-500 text-center flex justify-center -rotate-12"><HiOutlineCake size={100} /></p></span>
                        <p>Add Your Birthday</p>
                        <p className='font-light text-lg whitespace-nowrap'>This won't be a part of your public profile.</p>
                        <form className='flex flex-col' onSubmit={handleSubmit}>
                            <div className='flex gap-3'>
                                <select type='email' ref={userRef} onChange={handleChange} name='email' className='selectfield !w-[30%]'>
                                    <option>February</option>
                                    {years?.map(year => (
                                        <option>{year}</option>
                                    ))}
                                </select>
                                <select type='email' ref={userRef} onChange={handleChange} name='email' className='selectfield !w-[30%]'>
                                    <option>February</option>
                                    {months?.map(year => (
                                        <option>{year}</option>
                                    ))}
                                </select>
                                <select type='email' ref={userRef} onChange={handleChange} name='email' className='selectfield !w-[30%]'>
                                    <option>February</option>
                                </select>
                            </div>
                            <button type='submit' className='btn-primary mt-4 !mb-8' disabled={isLoading}>
                                {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Next'}</button>
                            <Link to='/signin' className='font-semibold text-blue-500 text-lg focus:text-blue-300 '>Go Back?</Link>
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
