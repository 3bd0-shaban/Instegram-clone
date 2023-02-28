import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { InstegramFont, Footer } from '../Components/Exports';

import { useBirthdayMutation } from '../Redux/APIs/AuthApi';
import { ImSpinner7 } from 'react-icons/im';
const SetBirthday = () => {
    const [year, setYear] = useState('1950');
    const [month, setMonth] = useState('January');
    const [day, setDay] = useState('1');
    const navigate = useNavigate();
    const [SearchQuery] = useSearchParams();
    const email = SearchQuery.get('email');

    var months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    const [birhday, { isLoading, isError, error }] = useBirthdayMutation();
    let days = Array.from({ length: 31 }, (_, i) => i + 1)
    let years = Array.from({ length: 74 }, (_, i) => i + 1950)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { year, month, day }
        try {
            await birhday({ data, email }).unwrap()
            setDay('');
            setMonth('');
            setYear('');
            navigate('/')
        } catch (error) {
            console.log(error?.data?.msg)
        }
    }

    return (
        <>
            <div className='container px-5 max-w-5xl flex gap-1 place-content-center mt-[2rem] md:mt-[6rem] mb-5 md:mb-28'>
                <div className='hidden md:flex justify-center'>
                    <img src={`Images/insta.png` || 'https://res.cloudinary.com/abdo9/image/upload/v1676229228/insta_jwyqco.png'} className='w-[85%] mt-8' alt='' />
                </div>
                <div className='container px-3 max-w-md md:mt-16'>
                    <div className='md:border rounded-lg md:py-10 border-gray-300 md:max-w-[90%] xsm:px-5 md:px-10 items-center text-center md:bg-white'>
                        <Link to="/"><p className="py-5 md:py-10 instalogo"><InstegramFont /></p></Link>
                        <div className='mb-5 space-y-2'>
                            <p className=' text-base'>Add your birthday</p>
                            <p>This won't be a part of your public profile </p>
                            <Link className='text-blue-600'>Why do I need to provide my birthday</Link>
                        </div>
                        <form className='flex flex-col' onSubmit={handleSubmit}>
                            <div className='flex gap-3 '>
                                <select onChange={(e) => setMonth(e.target.value)} value={month} name='month' className='selectfield bg-white !w-[30%]'>
                                    {months?.map((month, index) => (
                                        <option key={index}>{month}</option>
                                    ))}
                                </select>
                                <select onChange={(e) => setDay(e.target.value)} value={day} name='day' className='selectfield bg-white !w-[30%]'>
                                    {days?.map(day => (
                                        <option key={day}>{day}</option>
                                    ))}
                                </select>
                                <select onChange={(e) => setYear(e.target.value)} value={year} name='year' className='selectfield bg-white !w-[30%]'>
                                    {years?.map(year => (
                                        <option key={year}>{year}</option>
                                    )).reverse()}
                                </select>
                            </div>
                            <div className='text-light text-gray-500 text-sm space-y-5 '>
                                <p>You need to enter the date you were born</p>
                                <p>Use your own birthday, even if this account is for a bussness a pet , or something else</p>
                            </div>
                            <button type='submit' className='btn-primary mt-4 !mb-4' disabled={isLoading}>
                                {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Next'}</button>
                            <Link to='/signin' className='font-medium text-blue-500 text-md focus:text-blue-300 '>Go Back?</Link>
                            {isError && <span className="text-red-500 pb-3 font-poppins font-medium">{error?.data?.msg}</span>}
                        </form>
                    </div>
                    <div className='md:border rounded-lg max-w-[90%] border-gray-300 justify-center flex mt-5 md:bg-white'>
                        <p className="py-5 inline">have an account? <Link to="/signin" className='font-semibold text-blue-400'>Log in</Link></p>
                    </div>
                </div>
            </div>
            <div className='flex text-center justify-center mx-auto max-w-xs'>
            <img src='https://res.cloudinary.com/abdo9/image/upload/v1676229220/Meta_y7ivww.png' className='h-16' alt=''></img>
            </div>
            <Footer />
        </>
    )
}

export default SetBirthday
