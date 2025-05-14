import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='w-full h-[600px] flex'>
        <div className='w-[20%] border-r-2 h-[87%] py-6 ml-[100px]  text-xl'>
            {/* sidebar */}
            <span className='flex items-center space-x-20'><p>Womans Fashion</p> <ChevronRight /></span><br />
            <span className='flex items-center space-x-[106px]'><p>Mens Fashion</p> <ChevronRight /></span><br />
            <p>Electronics</p><br />
            <p>Home & Lifestyle</p><br />
            <p>Medicine</p><br />
            <p>Sports & Outdoor</p><br />
            <p>Babys & Toys</p><br />
            <p>Groceries & Pets</p><br />
            <p>Health & Beauty</p>
        </div>
        <div className='bg-black text-white ml-8 mt-8 w-[825px] h-[420px] rounded-sm flex'>
            {/* hero */}
            <div className='items-center gap-4 mt-24 ml-12 '>
              <div className='flex items-center gap-4'>
                <Image src={'/images/mobiles.png'} width={30} height={10} alt='mobiles'></Image>
                <p>iPhone 14 series</p>
                </div>
                <br />
                <div className='ml-1 text-6xl font-semibold'>
                     <h1>Up to 10%</h1>
                     <h1>off Voucher</h1>
                </div>
                <br />
                <div className='ml-1'>
                   <Image src={'/images/text.png'} width={90} height={10} alt='texts'></Image>
                </div>
            </div>           
            <br />
           
            <div className='mt-24'>
            <Image src={'/images/hero.png'} width={450} height={10} alt='heroes'></Image>
           </div>
        </div>
        
    </div>
  )
}

export default Hero