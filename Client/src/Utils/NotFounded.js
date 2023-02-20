import React from 'react'
import { SideBar, useTitle } from '../Components/Exports'

const NotFounded = () => {
    useTitle('Page Not Founded !')
    return (
        <div>
            <SideBar />
            <div className='container px-0 max-w-5xl md:max-w-3xl xl:max-w-4xl xxl:max-w-5xl mt-16 lg:mt-0 xl:mr-60 xxxl:mr-[26rem] space-y-10 text-center py-7'>
                <p className='font-semibold text-xl'>Sorry, this page isn't available.</p>
                <p>The link you followed may be broken, or the page may have been removed. Go back to Instagram.</p>
            </div>
        </div>
    )
}

export default NotFounded
