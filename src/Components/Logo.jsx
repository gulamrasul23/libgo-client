import React from 'react';
import logo from '../assets/logo11.png'

const Logo = () => {
    return (
        <div>
            <div className='flex items-center'>
                <img src={logo} alt="Logo" />
                <h1 className='font-bold'><span className='text-[#0D9470] '>Lib</span><span className='text-[#f78d20]'>Go</span></h1>
            </div>
        </div>
    );
};

export default Logo;