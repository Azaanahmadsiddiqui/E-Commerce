import React from 'react'
import { ChevronDown } from "lucide-react";


const TopHeader = () => {
  return (
    <div className='w-full p-3 bg-black hidden md:flex items-center justify-between'>
        <div className='max-w-7xl mx-auto flex items-center justify-center'>
          <p className='text-white'>
            Summer Sale For All Swim Suits And Free Express Delivery-OFF 50%!
            <span className='font-bold underline ml-2'>Shop Now</span>
            </p>
        </div>
        <p className='text-white flex items-center gap-2 mr-4'>English
          <ChevronDown />
        </p>
    </div>
  )
}

export default TopHeader