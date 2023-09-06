import React from 'react'
import { useNavigate } from 'react-router-dom'
import { loader } from '../assets';
import CampaignCard from './CampaignCard';




const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/create-campaign/${campaign.id}`, {
      state: campaign
    })
  }

  return (
    <div>
      <h1 className='font-epilogue text-[18px] text-semibold text-left text-white'>
        {title} ({campaigns.length})
      </h1>

      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && (
          <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain' />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className='font-epilogue font-semibold text-[15px] text-[#818183] leading-[30px]'>
            You currently have not any campaign
          </p>

        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />
        ))}


      </div>

    </div>
  )
}

export default DisplayCampaigns
