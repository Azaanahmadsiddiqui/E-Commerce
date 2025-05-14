import React from 'react'
import { Product } from "./FlashSales"
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
interface ProductCardProps {
    title: string,
    price: number,
    orignalPrice: number,
    discount?: string,
    rating: number,
    review: number,
    image: string,
    isNew: boolean
}

const ProductCard = ({image, isNew, title, discount, price, orignalPrice, rating, review}: ProductCardProps) => {
  return (
    <Card className='group relative overflow-hidden'>
        <CardContent className='p-0'>
         <div className="relative aspect-square gap-4">
         <img fill alt={title} src={image} className='w-full  h-full object-cover'/>
         </div>
         <div className="p-4 ">
            <h1 className='font-medium text-sm mb-1'>{title}</h1>
            <div className='flex items-center gap-2'>
                <span className='text-lg font-bold'>${price.toFixed(2)}</span>
                {orignalPrice && (
                    <span className='text-sm text-muted-foreground line-through'>${orignalPrice.toFixed(2)}</span>
                )}
            </div>
            <span className='text-sm text-muted-foreground line-through'>{orignalPrice}</span>
            <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((g, i) => (
                    <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>⭐</span>
                ))}
                <span className='text-sm text-muted-foreground'>({review})</span>
            </div>
         </div>
        </CardContent>
    </Card>
  )
}

export default ProductCard