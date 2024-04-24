import logo from "./assets/logo_only_04.png";
import brand from "./assets/brand_name_04.png";
import React, { useContext, useState, useEffect } from 'react';
import DropdownIcon from "./assets/undraw_male.svg";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
    const [showDropdown, setShowDropdown] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            setScrollPosition(position);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const headerStyle = {
        background: `${scrollPosition / 400})`, // Adjust 400 according to your preference for the scroll effect
        transition: 'background-color 0.3s ease',
        position: 'sticky',
        top: 0,
        zIndex: 1000 // Ensure the header stays above other content
    };

    return(
        <header className='p-2 flex justify-between z-10 bg-gradient-to-b from-pink-300 to-snow' style={headerStyle}>
            <a href='/' className='flex gap-2 items-center'>
                <img className='h-11 w-11' src={logo} alt="Logo" />
                <img className='h-9 w-13' src={brand} alt="Brand" />
            </a>
            <div className="flex items-center space-x-4 mr-10">
                <ul className="flex font-medium gap-10 mr-14">
                    <li>
                        <Link to={'/'} className="text-black hover:text-pink-400 hover:underline transition duration-300 ease-in-out ">Home</Link>
                    </li>
                    <li>
                        <Link to={'/About'} className="text-black hover:text-pink-400 hover:underline transition duration-300 ease-in-out">About</Link>
                    </li>
                    <li>
                        <Link to={'/Events'} className="text-black hover:text-pink-400 hover:underline transition duration-300 ease-in-out">Events</Link>
                    </li>
                    <li>
                        <Link to={'/contact'} className="text-black hover:text-pink-400 hover:underline transition duration-300 ease-in-out">Contact</Link>
                    </li>
                    <li>
                        <Link to={'/account/places/new'} className="text-black hover:text-pink-400 hover:underline transition duration-300 ease-in-out">List your Venue</Link>
                    </li>
                </ul>
            </div>
            {!!user && ( 
                <div className='mt-2 flex items-center gap-2  bg-floral border border-grey rounded-full py-2 px-4'>
                    <div>
                        <Link to={'/account'} className="focus:outline-none">
                            <img className='h-8 w-8 bg-white border rounded-2xl text-gray-900 cursor-pointer' src={DropdownIcon} alt="drop_icon" />
                        </Link>
                    </div>
                    <div className=" text-black font-medium">{user.username}</div>
                </div>
            )}
            {!user && (
            <Link to={'/login'} className='flex items-center gap-1 border border-gold rounded-full py-2 px-2'>
                <button
                    className="relative py-2 px-6 text-black text-base font-boldnded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
                >
                Login
                </button>
            </Link>
            )}
        </header>
    );
}
