import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { CustomButton } from '../components';
import { useStateContext } from '../context';
import { CountBox } from '../components';
import { thirdweb, loader } from '../assets';
import { calculateBarPercentage, daysLeft } from '../utils';

const CampaignDetails = () => {
  const { state } = useLocation();
  const { address, contract, getDonations, donate } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const navigate = useNavigate()

  const remainingDays = daysLeft(state.deadline)


  useEffect(() => {
    if (contract) fetchDonations()
  }, [contract, address])

  const fetchDonations = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  }



  const handleDonate = async () => {
    setIsLoading(true)
    await donate(state.pId, amount)
    navigate('/')
    setIsLoading(false)

  }


  return (
    <div >
      {isLoading && (
        <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain' />
      )}
      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <img src={state.image} alt="campaign-image"
            className='w-full h-[410px] object-cover rounded-xl'
          />
          <div className='relative w-full h-[5px] bg-[#3a3a43] mt-2'>
            <div className='absolute h-full bg-[#4acd8d]'
              style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%' }}
            >
            </div>
          </div>

        </div>
        <div className='flex flex-wrap md:w-[150px] w-full gap-[30px] justify-between'>
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className='w-full mt-[60px] flex lg:flex-row flex-col gap-5'>
        <div className='flex-1 flex flex-col gap-[40px]'>
          <div>
            <h4 className='font-epilogue font-semibold text-[18px]
              text-white uppercase'>
              Creator
            </h4>
            <div className='flex flex-wrap flex-row items-center mt-[20px] gap-[14px]'>
              <div className='w-[52px] h-[52px] flex justify-center items-center rounded-full bg-[#2c2f32] cursor-pointer'>
                <img src={thirdweb} alt="owner-profile" className='w-[60%] h-[60%] object-contain' />
              </div>

              <div className='flex flex-col'>
                <p className='flex-1 font-epilogue font-semibold text-[12px] text-[#808191] truncate'>
                  <span className='text-white'>{state.owner}</span>
                </p>
                <p className='flex-1 font-epilogue font-semibold text-[12px] text-[#b2b3bd]'>
                  10  <span className='text-[#808191]'>Campaigns</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className='font-epilogue font-semibold text-[18px]
              text-white uppercase'>
              Story
            </h4>
            <div className='mt-[20px]'>
              <p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] text-justify'>{state.description}</p>
            </div>
          </div>

          <div>
            <h4 className='font-epilogue font-semibold text-[18px]
              text-white uppercase'>
              Donators
            </h4>
            <div className='mt-[20px] flex flex-col gap-4'>

              {donators.length > 0 ? (donators.map((item, index) => {
                <div>DONATOR</div>

              })) : (

                <p className='font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] text-justify'>
                  There is currently no donators yet. Be the first one.
                </p>
              )}

            </div>
          </div>
        </div>

        <div className='w-full flex-1'>
          <h4 className='font-epilogue font-semibold text-[18px]
              text-white uppercase'>
            Fund
          </h4>

          <div className='bg-[#1c1c24]  flex flex-col p-4 mt-[20px] rounded-[10px]'>
            <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]'>
              Fund The Campaign
            </p>
            <div className='mt-[30px]'>
              <input
                type="number"
                step="0.05"
                placeholder="ETH 0.5"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='w-full py-[10px] bg-transparent sm:px-[20px] px-[15px] 
              outline-none rounded-[10px] border-[1px] border-[#3a3a43] font-epilogue 
              text-white text-[18px] placeholder:text-[#4b5264]'
              />


            </div>

            <div className='flex flex-col items-center justify-center my-[20px] p-4 rounded-[10px] bg-[#13131a]'>
              <h4 className='font-epilogue font-semibold text-[14px] leading-[22px] text-white'>
                Back it because you believe in it
              </h4>
              <p className='mt-[20px] font-epilogue font-normal text-[#808191] leading-[22px]'>
                Support the project for no reward
              </p>
            </div>
            <CustomButton
              btnType="button"
              title="FUnd Campaign"
              styles="w-full bg-[#8c6dfd]"
              handleClick={handleDonate}
            />
          </div>

        </div>


      </div>

    </div>
  )
}

export default CampaignDetails
