import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer">
     <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />

      <button onClick={()=>Navigate('/')}className='flex justify-center items-center rounded-full text-sm cursor-pointer bg-primary txt-white px-10 py-2.5'>
        Login
        <img src={assets.arrow} alt="arrow" className="w-3 " /> 
      </button>
    </div>
  );
};

export default Navbar;