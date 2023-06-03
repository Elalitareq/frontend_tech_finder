import React from 'react'
import ProductCard from '../productCard'

const products=[
  {title:"Shoes",price:400},
  {title:"Shoes",price:400},
  {title:"Shoes",price:400},
  {title:"Shoes",price:400},
  {title:"Shoes",price:400},
  {title:"Shoes",price:400},
]
const ProductCardListing = () => {
  return (
    <div className='flex w-full gap-6 justify-between flex-wrap'>
    {products.map((product,index) => (

    <ProductCard product={product} key={index}/>
    ))}
    </div>
  )
}

export default ProductCardListing