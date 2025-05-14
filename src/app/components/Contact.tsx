import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Contact() {
  return ( 
    <div className='h-[700px]'>
        <div className='ml-16 mt-12'> 
            <h4><Link href={'/'}>Home</Link> <i>/</i> <Link href={'/ContactUs'}><b>Contact</b></Link></h4>
        </div>
        <div className='flex flex-col-2 mt-16 ml-20 '>
        {/* left side */}
        <div>
           <div className='border-b-2 border-gray-500 py-10 mb-10 gap-x-4'>
            <h1 className='flex gap-2 text-2xl font-semibold mb-4'><Image src={'/images/icons-phone.png'} width={30} height={50} alt='icons-phone'></Image>Call To Us</h1>
            <p className='mb-2'>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
           </div>
           <div>
            <h1 className=' flex gap-2 text-2xl font-semibold mb-4'><Image src={'/images/icons-mail.png'} width={30} height={50} alt='icons-mail'></Image> Write To Us</h1>
            <p className='mb-2'>Fill out our form and we will contact you within 24 hours.</p>
            <p className='mb-2'>Emails: customer@exclusive.com</p>
            <p className='mb-2'>Emails: support@exclusive.com</p>
           </div>
        </div>
        {/* right side */}
        <div className='ml-40'>
            <div className='flex flex-row-3 gap-4'>
                <input className='bg-gray-300 rounded-md px-2 py-3' type="text" placeholder='Your Name *' />
                <input className='bg-gray-300 rounded-md px-2 py-3' type="email" placeholder='Your Email *' />
                <input className='bg-gray-300 rounded-md px-2 py-3' type="text" placeholder='Your Phone *' />
            </div>
            <div className='mt-10 h-[300px]'>
                <input className='bg-gray-300 px-2 w-[620px] h-[300px]' type="text" placeholder='Your Message' />
            </div>
        <div className='py-4 ml-[485px]'>
            <button className='bg-red-500 px-4 py-2'><Link href={'/'}>Send Message</Link></button>
        </div>
        </div>
        </div>
        
    </div>
  )
}

export default Contact