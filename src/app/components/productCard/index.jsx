import React from 'react'
import Image from "next/image"

const ProductCard = ({product}) => {
  return (
    
<div className="p-0 my-3 bg-gray-200 shadow-md max-w-[300px] rounded">
    <Image className="product-img w-full" src="https://image.shutterstock.com/z/stock-photo-vintage-red-shoes-on-white-background-92008067.jpg" alt="product" width="300" height="300" />
  <div className="p-4 pt-0">
    <h3 className="  uppercase font-semibold text-6 mb-3 flex justify-between">
      {product.title}
    <div className="flex flex-wrap text-center font-bolder items-center gap-2"><span className="text-[1rem]">${product.price}</span>{product.oldPrice&&<span className=" line-through text-[.75rem]">${product.oldPrice}</span>}</div>
      </h3>
    
    <div className="font-bold">
      <button className='block w-full bg-primary text-white py-2 px-3 text-lg font-bold rounded-md uppercase cursor-pointer border-0 hover:bg-primary-light  '>View Product</button>
    </div>
  </div>
</div>
  )
}

export default ProductCard