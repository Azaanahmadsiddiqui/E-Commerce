import Image from 'next/image'
import React from 'react'

function AHero() {
  return (
    <div className='w-full'>
        <div className='flex flex-row gap-x-20 mt-[100px] w-full justify-center items-center'>
            <Image src={'/images/aboutframe1.png'} width={250} height={100} alt="aboutframes"></Image>
            <Image src={'/images/aboutframe2.png'} width={250} height={250} alt='aboutframes' className='border border-gray-400 rounded-md'></Image>
            <Image src={'/images/aboutframe3.png'} width={250} height={100} alt='aboutframes'></Image>
            <Image src={'/images/aboutframe4.png'} width={250} height={100} alt='aboutframes'></Image>
        </div>

         <div>
         <div className='flex flex-row gap-x-20 mt-[100px] w-full justify-center items-center'>
            <Image src={'/images/aboutframe5.png'} width={250} height={100} alt='aboutframes'></Image>
            <Image src={'/images/aboutframe6.png'} width={250} height={250} alt='aboutframes'></Image>
            <Image src={'/images/aboutframe7.png'} width={250} height={100} alt='aboutframes'></Image>
        </div>
         </div>
    </div>
  )
}

export default AHero