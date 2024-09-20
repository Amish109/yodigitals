"use client"
import { getApiData } from '@/helper/common';
import Link from 'next/link'
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { useEffect } from 'react';

const page = () => {

const params = useParams()

const [view, setView] = useState("")
const [brand, setBrand] = useState("")
    const getProductDetails = async () => {
   
        const id  = params.id
        try {
          const apiResData = await getApiData(`product/${id}`);
    console.log(apiResData,"bbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    
          if (apiResData) {
            setView(apiResData);
            setBrand(apiResData?.brand)
          } else {
           
          }
        } catch (error) {
          console.error("Error fetching:", error);
         
        }
      };

      useEffect(() => {
        getProductDetails();
      }, []);
    
  return (
    <>
   <div id="wrapper">
 
  <div className="tf-breadcrumb">
    <div className="container">
      <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
       
        <div className="tf-breadcrumb-prev-next">
          <Link href="#" className="tf-breadcrumb-prev hover-tooltip center">
            <i className="icon icon-arrow-left" />
          </Link>
          <Link href="#" className="tf-breadcrumb-back hover-tooltip center">
            <i className="icon icon-shop" />
          </Link>
          <Link href="#" className="tf-breadcrumb-next hover-tooltip center">
            <i className="icon icon-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  </div>
  {/* /breadcrumb */}
  {/* default */}
  <section className="flat-spacing-4 pt_0">
    <div className="tf-main-product section-image-zoom">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="tf-product-media-wrap sticky-top">
            <img src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708674453/Croma%20Assets/Communication/Mobiles/Images/300792_0_luu1mj.png" alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="tf-product-info-wrap position-relative">
              <div className="tf-zoom-main" />
              <div className="tf-product-info-list other-image-zoom">
                <div className="tf-product-info-title">
                  <h5>{view?.title}</h5>
                </div>
                <div className="tf-product-info-badges">
                  <div className="badges">Description</div>
                  <div className="product-status-content">
                    <i className="icon-lightning" />
                    <p className="fw-6">
                     {view?.description}
                    </p>
                  </div>
                </div>
                <div className="tf-product-info-price">
                  <div className="price-on-sale"> ₹ {view?.price}</div>
                  {/* <div className="compare-at-price">$10.00</div> */}
                  {/* <div className="badges-on-sale">
                    <span>20</span>% OFF
                  </div> */}
                </div>
                <div className="tf-product-info-liveview">
                  <div style={{fontSize:"20px"}} className="">status</div>
                  <p style={{fontSize:"20px", color:"green ", borderBottom:"2px solid green"}} className="">{view?.status}</p>
                </div>
              
                <div className="tf-product-info-quantity">
                  <div className="quantity-title fw-6">Quantity</div>
                  <div className="wg-quantity">
                    <span className="btn-quantity minus-btn">-</span>
                    <input type="text" name="number" defaultValue={1} />
                    <span className="btn-quantity plus-btn">+</span>
                  </div>
                </div>
                <div className="tf-product-info-buy-button">
                  <form className="">
                    <Link
                      href="#"
                      className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn "
                    >
                      <span>Order Place After login show</span>
                    </Link>
                 
                    <Link
                      href="#"
                      className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn "
                    >
                      <span>Order Enquiry before login show</span>
                    </Link>
                  
                  </form>
                </div>
            
              
             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  </section>
  
 

 
</div>

    </>
  )
}

export default page