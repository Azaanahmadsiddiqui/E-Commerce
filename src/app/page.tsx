import React from 'react'
import Hero from './components/Hero'
import FlashSales from './components/FlashSales'
import { Button } from '@/components/ui/button'


export default async function Home (){
   const res = await fetch("https://fakestoreapi.com/products")

   if (!res.ok) {
    return <div>Error fetching data: {res.status}</div>;
  }
  
   const data = await res.json()
   if(!data) return <div>Loading...</div>
  return (
    <div>
      <Hero />
      <FlashSales 
       heading='Flash Sales'
       subheading='Todays'
       showTimer={true}
       action={<Button className='mr-[130px]'>Hello World</Button>}
       isCarousel={false}
       products={data}
       />
    </div>
  )
};