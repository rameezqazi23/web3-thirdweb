import React, { useState } from 'react'
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

import { money } from '../assets';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from "../utils";

const CreateCampaign = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='flex justify-center items-center flex-col bg-[#1c1c24] sm:p-10 p-4 rounded-[10px]'>
      {isLoading && "Loading..."}

      <div className='flex justify-center items-center p-[16px] bg-[#3a3a43] sm:min-w-[380px] rounded-[10px]'>
        <h1 className='font-bold font-epilogue sm:text-[25px] text-[18px] leading-[38px] text-white'>Start Campaign</h1>

      </div>
      <form onSubmit={handleSubmit}
        className='w-full mt-[65px] flex flex-col gap-[30px]'
      >
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName="Your Name *"
            placeholder="Write a title"
            inputType="text"
            value={form.name}
            handleChange={(e) => e.target.value}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => e.target.value}
          />
        </div>
        <FormField
            labelName="Story *"
            placeholder="Write a Story"
            isTextArea
            value={form.description}
            handleChange={(e) => e.target.value}
          />

      </form>



    </div>
  )
}

export default CreateCampaign
