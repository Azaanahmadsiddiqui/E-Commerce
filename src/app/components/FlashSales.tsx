import React from 'react'
import SectionHeader from './SectionHeader'
import LiveDataTime from '@/components/Timer'
import ProductCollection from './ProductCollection'

interface Product {
     title:string,
     image:string,
     price:number,
     rating: {
        rate: number,
        count:number,
     }
}

interface FlashSalesProps {
    heading: string,
    subheading: string,
    showTimer: boolean,
    action: React.ReactNode,
    products: Product[],
    isCarousel: boolean,
    ctaText?: string,
}

const FlashSales = ({heading, subheading, showTimer, action, products, isCarousel}: FlashSalesProps) => {
  return (
    <div className='flex flex-col justify-center'>
        <div className='flex items-end justify-between'>
            <div className='gap-x-10 flex items-end'>
                <SectionHeader heading={heading} subHeading={subheading} />
                {showTimer && <LiveDataTime />}
            </div>
            {action}
        </div>
        <div className='mt-12 p-8'>
            <ProductCollection products={products} isCarousel={isCarousel}  />
        </div>
    </div>
  )
}

export default FlashSales