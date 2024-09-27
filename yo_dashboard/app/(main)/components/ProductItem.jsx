import Link from 'next/link'
import React from 'react'

const ProductItem = ({ item, index }) => {
  const baseUrl = process.env.NEXT_PUBLIC_APIBASEURL || '';

  return (
    <div className="card-product style-4 fl-item" key={index}>
      <div className="card-product-wrapper">
        {/* Product Image */}
        <Link href={`/product/${item.id}`} className="product-img">
          <img
            className="lazyload img-product"
            data-src={ item?.images?.[0] ? `${baseUrl}/${item.images[0]}` : '/placeholder.jpg'}
            src={ item?.images?.[0] ? `${baseUrl}/${item.images[0]}` : '/placeholder.jpg'}  
            alt={`${item?.title} image`}
           />
          <img
            className="lazyload img-hover"
            data-src={ item?.images?.[1] ? `${baseUrl}/${item.images[1]}` : '/placeholder.jpg'}
            src={ item?.images?.[1] ? `${baseUrl}/${item.images[1]}` : '/placeholder.jpg'}    
            alt={`${item?.title} hover image`}
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

      {/* Product Information */}
      <div className="card-product-info text-center">
        <Link href={`/product/${item.id}`} className="title link">
          {item?.title}
        </Link>
        <span className="price text-center">₹&nbsp;{item?.price}</span>
      </div>
    </div>
  );
}

export default ProductItem;
