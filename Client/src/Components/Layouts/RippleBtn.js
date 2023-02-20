import { useState } from "react";

const RippleBtn = () => {
    const [spanStyle, setSpanStyle] = useState({});

    const handleClick = (e) => {
        const btn = e.target;
        const offset = btn.getBoundingClientRect();
        const x = e.clientX - offset.left;
        const y = e.clientY - offset.top;
        const span = document.createElement("span");

        setSpanStyle({
            top: y + "px",
            left: x + "px",
        });

        btn.appendChild(span);

        setTimeout(() => {
            btn.removeChild(span);
        }, 700);
    };

    return (
        <div className="max-w-screen-sm mx-auto mt-5 text-center">
            <button
                className="bg-blue-500 text-white rounded-lg px-4 py-3 text-sm font-medium 
                   min-w-[200px] cursor-pointer relative overflow-hidden focus:outline-none 
                   active:outline-none"
                onClick={handleClick}
            >
                Click Me
                <span
                    className="ripple-span absolute rounded-full bg-white opacity-70 transform -translate-x-1/2 -translate-y-1/2"
                    style={spanStyle}
                ></span>
            </button>
        </div>
    );
}
export default RippleBtn