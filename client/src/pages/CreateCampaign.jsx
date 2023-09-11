import React, { useState } from 'react'
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

import { money, loader } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from "../utils";
import { useStateContext } from '../context';

const CreateCampaign = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const { createCampaign } = useStateContext();

  const handleFormChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) }) //1 ether is equal to 18 units
        setIsLoading(false)
        navigate('/')

      } else {
        alert("Provide valid image URL")
        setForm({ ...form, image: '' })
      }

    })

    // console.log("Form data==> ", form)
  }

  return (
    <div className='flex justify-center items-center flex-col bg-[#1c1c24] sm:p-10 p-4 rounded-[10px]'>
      {isLoading && (
        <Loader />
        // <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain' />
      )}

      <div className='flex justify-center items-center p-[16px] bg-[#3a3a43] sm:min-w-[380px] rounded-[10px]'>
        <h1 className='font-bold font-epilogue sm:text-[25px] text-[18px] leading-[38px] text-white'>Start Campaign</h1>

      </div>
      <form onSubmit={handleSubmit}
        className='w-full mt-[65px] flex flex-col gap-[30px]'
      >
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName="Your Name *"
            placeholder="Write Your Name"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormChange('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormChange('title', e)}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write a Story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormChange('description', e)}
        />

        <div className='flex w-full h-[130px] rounded-[10px] justify-start items-center bg-orange-500 p-4'>
          <img src={money} alt="money" className='w-[40px] h-[40px] object-contain' />
          <h4 className='font-epilogue font-bold ml-[20px] text-white text-[25px]'>You will get 100% of the raised amount</h4>
        </div>

        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName="Goal *"
            placeholder="0.5 ETH"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormChange('deadline', e)}
          />
        </div>
        <FormField
          labelName="Campaign Image *"
          placeholder="Place image url of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormChange('image', e)}
        />

        <div className='flex justify-center items-center mt-[40px]'>
          <CustomButton
            btnType="submit"
            title="Submit Campaign"
            styles="bg-[#1dc071]"
          />
        </div>

      </form>



    </div>
  )
}

export default CreateCampaign
