"use client"
import { getApiData } from '@/helper/common';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = () => {

  const baseUrl = process.env.NEXT_PUBLIC_APIBASEURL || ''; 
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchProductList = async () => {
    try {
      const apiResData = await getApiData(`announcement`);
      if (apiResData.success === true) {
        setData(apiResData?.announcements);
      } else {
        setData([]);
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

  console.log(data, "data");

  return (
    <>
    <>
  
  <div id="wrapper">
  
  
    <div className="tf-page-title">
      <div className="container-full">
        <div className="row">
          <div className="col-12">
            <div className="heading text-center">Announcement</div>
            <ul className="breadcrumbs d-flex align-items-center justify-content-center">
              <li>
                <Link href="index">Home</Link>
              </li>
              <li>
                <i className="icon-arrow-right" />
              </li>
              <li>Announcement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
   
    <div className="blog-grid-main">
      <div className="container">
        <div className="row">


          {data && data.length> 0 ?(
            data.map((item, index)=>(
              <>
              <div className="col-xl-4 col-md-6 col-12">
            <div className="blog-article-item">
              <div className="article-thumb">
                <Link href={`/announcement/${item.id}`}>
                  <img
                    className="lazyload"
                    data-src={item?.images?.[0] ? `${baseUrl}/${item.images[0]}` : '/placeholder.jpg'}
                    src={item?.images?.[0] ? `${baseUrl}/${item.images[0]}` : '/placeholder.jpg'}  
                    alt="img-blog"
                  />
                </Link>
                <div className="article-label">
                  <Link
                   href={`/announcement/${item.id}`}
                    className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn"
                  >
                    Announcement
                  </Link>
                </div>
              </div>
              <div className="article-content">
                <div className="article-title">
                  <Link href={`/announcement/${item.id}`} className="">
                  {item.title}
                  </Link>
                </div>
                <div className="article-btn">
                  <Link  href={`/announcement/${item.id}`} className="tf-btn btn-line fw-6">
                    More images
                    <i className="icon icon-arrow1-top-left" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
              </>
            ))
          ):""}
          
         
       
       
         
        
         
      
         
        </div>
      </div>
    </div>
    {/* /blog-grid-main */}
    {/* footer */}
   
    
  </div>
  {/* /modal find_size */}
</>

    </>
  )
}

export default page