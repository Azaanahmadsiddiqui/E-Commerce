import React from 'react'
import { Product } from './FlashSales'
import ProductCard from './ProductCard'

const ProductCollection = ({products, isCarousel}: {products: Product[], isCarousel: boolean}) => {

   if(isCarousel) {
      return <div>Carousel</div>
   }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto px-4'>
        {products.map((product, index) =>(  
           <ProductCard 
           key={index}
           name={product.name}
           image={product.image}
           price={product.price}
           discount='34'
           isNew
           orignalPrice={product.price}
           rating={product.rating.rate}
           review={product.rating.count}
           
           />
        ))}
    </div>
  )
}

export default ProductCollection