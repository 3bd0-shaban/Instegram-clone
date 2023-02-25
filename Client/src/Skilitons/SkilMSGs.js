import React, { useState } from 'react'

const SkilMSGs = () => {
    const [isLeft, setisLeft] = useState([false, true, false, false, true])
    const [left, setLeft] = useState([5, 10, 24, 12, 20, 5, 16, 28])
    // for (let i = 0; i < 10; i++) {
    //     const num = Math.floor(Math.random(i) * 10);
    //     setLeft(num)
    // }
    // console.log(left)
    return (
        left.map((item, index) => (
            <div key={index} className='pt-3 p-3'>
                <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                    <div className={`border h-${item} w-${item} rounded-2xl flex items-center px-${item} py-${item}
                     ${isLeft ? 'justify-start bg-slate-100' :
                            'justify-end bg-slate-200'}`}>
                        <span className={`w-${item} h-${item}`}></span>
                    </div>
                </div>
            </div>
        ))
    )
}

export default SkilMSGs
