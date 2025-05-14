import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function About() {
  return (
    <div>
        <div className='ml-16 mt-12'> 
        <h4><Link href={'/'}>Home</Link> <i>/</i> <Link href={'/AboutUs'}><b>AboutUs</b></Link></h4>
        </div>
       <div className='flex flex-col-2 ml-16 mr-12 '>
        {/* left div */}
        <div className='w-[500px] mt-[120px]'>
          <h1 className='text-6xl font-bold'>Our Story</h1>
          <div className='mt-8'>
          <p>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh.
             Supported by wide range of tailored marketing, data and service solutions,
             Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
             </div>
            <div className='mt-4'> 
          <p>Exclusive has more than 1 Million products to offer, growing at a very fast.
             Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
             </div>
        </div>
        {/* right div */}
        <div className='mt-[20px] ml-[150px]'>
        <Image src={'/images/aboutimage.png'} width={550} height={609} alt='aboutimage'></Image>
        </div>
        </div>
    </div>
  )
}

export default About