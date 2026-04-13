import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      {/* NEW IMAGE TAG WITH LARGER LOGO: 
        Base width w-56, sm breakpoint width w-72. 
        'h-auto object-contain' keeps it from distorting.
      */}
      <img 
        onClick={() => navigate('/')} 
        src={assets.logo} 
        alt="ThoughtForge Logo" 
        className="w-56 sm:w-72 h-auto object-contain cursor-pointer" 
      />

      {/* BUTTON TWEAKS: 
        Added gap-2 for spacing, corrected txt-white to text-white. 
      */}
      <button 
        onClick={() => navigate('/admin')}
        className='flex justify-center items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-8 py-2.5 transition-all hover:opacity-90'
      >
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} alt="arrow" className="w-3" /> 
      </button>
    </div>
  );
};

export default Navbar;