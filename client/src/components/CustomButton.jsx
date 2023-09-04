import React from 'react'

const CustomButton = ({ btnType, title, styles, handleClick }) => {
    return (
        <button
            type='button'
            onClick={handleClick}
            className={`font-epilogue px-4 rounded-xl leading-[26px] text-[16px] font-bold text-white min-h-[52px] ${styles}`}


        >
            {title}

        </button>
    )
}

export default CustomButton
