"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { deleteApiData, getApiData, postApiData } from "@/helper/common";
import RoleBase from './RoleBase'
import ProductItems from './ProductItem'
import Loader from '../components/Loader';
const Product = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductList = async () => {
    try {
      const apiResData = await getApiData(`product/list`);
      if (apiResData.success === true) {
        setData(apiResData?.products);
        setLoading(false)
      } else {
        setData([]);setLoading(true)
        setError(apiResData.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

 
  

  if (loading) {
    return <Loader />;
  }

  return (
    <>


     <section className="">
     <div className="container">
     <div className="flat-title mb_1 gap-14">
     <span className="title wow fadeInUp mt-5" data-wow-delay="0s">
     Welcome to Yo Digitals Pvt Ltd

            </span>
              <RoleBase/>
            </div>
            </div>
     </section>
     <div style={{background:"black"}} className="tf-marquee marquee-sm bg_blue-3">
  <div className="wrap-marquee">
   
   
   
    <div className="marquee-item">
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={7}
          height={6}
          viewBox="0 0 7 6"
          fill="none"
        >
          <path d="M3.5 0L6.53109 5.25H0.468911L3.5 0Z" fill="white" />
        </svg>
      </div>
      <p className="text text-white text-uppercase fw-6">
      :

      🛍️ Welcome to Yo Digital! 🛍️
      </p>
    </div>
    <div className="marquee-item">
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={7}
          height={6}
          viewBox="0 0 7 6"
          fill="none"
        >
          <path d="M3.5 0L6.53109 5.25H0.468911L3.5 0Z" fill="white" />
        </svg>
      </div>
      <p className="text text-white text-uppercase fw-6">
      ✨Discover the best deals and unique finds!✨
      </p>
    </div>
    <div className="marquee-item">
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={7}
          height={6}
          viewBox="0 0 7 6"
          fill="none"
        >
          <path d="M3.5 0L6.53109 5.25H0.468911L3.5 0Z" fill="white" />
        </svg>
      </div>
      <p className="text text-white text-uppercase fw-6">
      ✨Your shopping adventure begins here!✨
      </p>
    </div>
  
   
    <div className="marquee-item">
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={7}
          height={6}
          viewBox="0 0 7 6"
          fill="none"
        >
          <path d="M3.5 0L6.53109 5.25H0.468911L3.5 0Z" fill="white" />
        </svg>
      </div>
      <p className="text text-white text-uppercase fw-6">
      Shop smart, live well. Your next favorite product awaits!
      </p>
    </div>
    <div className="marquee-item">
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={7}
          height={6}
          viewBox="0 0 7 6"
          fill="none"
        >
          <path d="M3.5 0L6.53109 5.25H0.468911L3.5 0Z" fill="white" />
        </svg>
      </div>
      <p className="text text-white text-uppercase fw-6">
      ✨ Greetings, Digital Pioneer! ✨
      </p>
    </div>

    <div className="marquee-item">
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={7}
          height={6}
          viewBox="0 0 7 6"
          fill="none"
        >
          <path d="M3.5 0L6.53109 5.25H0.468911L3.5 0Z" fill="white" />
        </svg>
      </div>
      <p className="text text-white text-uppercase fw-6">
      :

      🛍️ Welcome to Yo Digital! 🛍️
      </p>
    </div>
    <div className="marquee-item">
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={7}
          height={6}
          viewBox="0 0 7 6"
          fill="none"
        >
          <path d="M3.5 0L6.53109 5.25H0.468911L3.5 0Z" fill="white" />
        </svg>
      </div>
      <p className="text text-white text-uppercase fw-6">
      ✨Discover the best deals and unique finds!✨
      </p>
    </div>
    <div className="marquee-item">
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={7}
          height={6}
          viewBox="0 0 7 6"
          fill="none"
        >
          <path d="M3.5 0L6.53109 5.25H0.468911L3.5 0Z" fill="white" />
        </svg>
      </div>
      <p className="text text-white text-uppercase fw-6">
      ✨Your shopping adventure begins here!✨
      </p>
    </div>
  
   
    <div className="marquee-item">
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={7}
          height={6}
          viewBox="0 0 7 6"
          fill="none"
        >
          <path d="M3.5 0L6.53109 5.25H0.468911L3.5 0Z" fill="white" />
        </svg>
      </div>
      <p className="text text-white text-uppercase fw-6">
      Shop smart, live well. Your next favorite product awaits!
      </p>
    </div>
    <div className="marquee-item">
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={7}
          height={6}
          viewBox="0 0 7 6"
          fill="none"
        >
          <path d="M3.5 0L6.53109 5.25H0.468911L3.5 0Z" fill="white" />
        </svg>
      </div>
      <p className="text text-white text-uppercase fw-6">
      ✨ Greetings, Digital Pioneer! ✨
      </p>
    </div>
  </div>
</div>


      <section className="mb-5">
        <div className="container">
          <div className="flat-title mb_1 gap-14">
            <span className="title wow fadeInUp" data-wow-delay="0s">
              New Arrivals
            </span>
            <p className="sub-title wow fadeInUp text-xl" data-wow-delay="0s">
              Introducing our latest tech essentials lineup! <br /> Immerse
              yourself in the ultimate mobile experience with our
              state-of-the-art Smart Device.
            </p>
          </div>
          <div className="grid-layout wrapper-shop"  data-grid={data && data.length > 0 ? "grid-4" : "undefined text-center"}>
            {data && data.length > 0 ? (
              data.map((item, index) => {
                const images = Array.isArray(item.images)
                ? item.images
                : item.images ? item.images.split(",") : [];

                return (
                 <ProductItems item={item} index={index} images={images}/>
                );
              })
            ) : (
              <>
               <div  data-grid="grid-12">
                        <img
                          style={{ margin: "auto", marginLeft:"250px" }}
                          className="not-founf"
                          src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727049600&semt=ais_hybrid"
                          alt="No data"
                        />
                      </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
