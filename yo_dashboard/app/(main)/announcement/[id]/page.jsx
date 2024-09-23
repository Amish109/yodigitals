"use client"
import { getApiData } from '@/helper/common'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  
const params = useParams()

const [view, setView] = useState("")
    const getProductDetails = async () => {
   
        const id  = params.id
        try {
          const apiResData = await getApiData(`announcement/${id}`);
    console.log(apiResData,"announcement");
    
          if (apiResData) {
            setView(apiResData?.announcement);
           
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
  {/* header */}

  {/* /header */}
  {/* blog-detail */}
  <div className="blog-detail">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="blog-detail-main">
            <div className="blog-detail-main-heading">
              
              <div className="title">{view?.title}</div>
              <div className="meta">
  by <span>yodigitals</span> on <span>{new Date(view?.createdAt).toLocaleDateString()}</span>
</div>

              <div className="image">
                <img
                  className="lazyload"
                  data-src="https://i.ytimg.com/vi/QqbdI8ocsZU/maxresdefault.jpg"
                  src="https://i.ytimg.com/vi/QqbdI8ocsZU/maxresdefault.jpg"
                  alt=""
                />
              </div>
            </div>
            <blockquote>
              <div className="icon">
                <img src="images/item/quote.svg" alt="" />
              </div>
              <div className="text">
               {view?.description}
              </div>
            </blockquote>
            <div className="grid-image">
              <div>
                <img
                  className="lazyload"
                  data-src="https://i.ytimg.com/vi/QqbdI8ocsZU/maxresdefault.jpg"
                  src="https://i.ytimg.com/vi/QqbdI8ocsZU/maxresdefault.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="lazyload"
                  data-src="https://i.ytimg.com/vi/QqbdI8ocsZU/maxresdefault.jpg"
                  src="https://i.ytimg.com/vi/QqbdI8ocsZU/maxresdefault.jpg"
                  alt=""
                />
              </div>
            </div>
           
        
          
          </div>
        </div>
      </div>
    </div>
  </div>
  
 
</div>

    
    </>
  )
}

export default page