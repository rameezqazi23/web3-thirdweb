import React from 'react'
import { loader } from '../assets';

const Loader = () => {
    return (
        <div className='flex flex-col fixed inset-0 z-10 bg-[#0a192f] backdrop-filter 
    backdrop-blur-sm bg-opacity-50 items-center justify-center'>
            <img src={loader} alt="loader-icon" className='w-[100px] h-[100px] object-contain' />
            <p className='font-epilogue text-white font-bold text-center mt-[20px]'>
                Transaction is in progress
                <br />
                Please wait...

            </p>

        </div>
    )
}

export default Loader
