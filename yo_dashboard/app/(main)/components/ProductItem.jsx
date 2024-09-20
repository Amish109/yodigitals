import Link from 'next/link'
import React from 'react'

const ProductItem = ({item, index,images}) => {
  return (
    <div>  <div className="card-product style-4 fl-item" key={index}>
    <div className="card-product-wrapper">
      <Link href={`/product/${item.id}`} className="product-img">
        <img
          className="lazyload img-product"
          data-src={
            images[0]
              ? `https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708674453/Croma%20Assets/Communication/Mobiles/Images/300792_0_luu1mj.png`
              : "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708674453/Croma%20Assets/Communication/Mobiles/Images/300792_0_luu1mj.png"
          }
          src={
            images[0]
              ? `https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708674453/Croma%20Assets/Communication/Mobiles/Images/300792_0_luu1mj.png`
              : "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708674453/Croma%20Assets/Communication/Mobiles/Images/300792_0_luu1mj.png"
          }
          alt="image-product"
        />
        <img
          className="lazyload img-hover"
          data-src={
            images[1]
              ? `https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708674453/Croma%20Assets/Communication/Mobiles/Images/300792_0_luu1mj.png`
              : "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708674453/Croma%20Assets/Communication/Mobiles/Images/300792_0_luu1mj.png"
          }
          src={
            images[1]
              ? `https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708674453/Croma%20Assets/Communication/Mobiles/Images/300792_0_luu1mj.png`
              : "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708674453/Croma%20Assets/Communication/Mobiles/Images/300792_0_luu1mj.png"
          }
          alt="image-hover"
        />
      </Link>
      <div className="list-product-btn column-right"></div>
      <div className="size-list">
        <span>S</span>
        <span>M</span>
        <span>L</span>
        <span>XL</span>
      </div>
      <Link
        href="#quick_add"
        data-bs-toggle="modal"
        className="btn-quick-add quick-add"
      >
        {item?.status}
      </Link>
    </div>
    <div className="card-product-info text-center">
      <Link href={`/product-detail/${item.id}`} className="title link">
        {item?.title}
      </Link>
      <span className="price text-center">{item?.price}</span>
    </div>
  </div></div>
  )
}

export default ProductItem