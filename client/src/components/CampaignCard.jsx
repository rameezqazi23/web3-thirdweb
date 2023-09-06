import React from 'react'
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const CampaignCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {

    const remainingDays = daysLeft(deadline)

    return (
        <div className='sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer'
            onClick={handleClick}
        >
            <img src={image} alt="fund" className='w-full h-[158px] object-cover rounded-[15px]' />
            <div className='flex flex-col p-6'>
                <div className='flex flex-row mb-[18px] items-center'>
                    <img src={tagType} alt="folder-logo" className='w-[17px] h-[17px] object-contain' />
                    <p className='font-epilogue font-medium text-[#808191] text-[12px] ml-[12px] mt-[2px]'>
                        Category
                    </p>
                </div>

                <div>
                    <h3 className='font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate'>
                        {title}
                    </h3>
                    <p className='font-epilogue font-normal leading-[18px] text-[#808191] text-left mt-[5px]'>
                        {description}
                    </p>
                </div>
                <div className='flex justify-between mt-[15px] gap-2'>
                    <div className='flex flex-col'>
                        <h4 className='font-empilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>
                            {amountCollected}
                        </h4>
                        <p className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate'>
                            Raised of {target}
                        </p>

                    </div>
                    <div>
                        <h4 className='font-empilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]'>
                            {remainingDays}
                        </h4>
                        <p className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate'>
                            Days Left
                        </p>

                    </div>
                </div>
                <div className='flex items-center mt-[20px] gap-[12px]'>
                    <div className='w-[30px] h-[30px] flex justify-center items-center rounded-full bg-[#13131a]'>
                        <img src={thirdweb} alt="owner-profile" className='w-1/2 h-1/2 object-contain' />
                    </div>
                    
                    <p className='flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate'>
                        by <span className='text-[#b2b3bd]'>{owner}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CampaignCard
