"use client";
import { getApiData } from "@/helper/common";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";



const Page = () => {







  const params = useParams();
  const baseUrl = process.env.NEXT_PUBLIC_APIBASEURL || '';

  const [view, setView] = useState("");
  const [brand, setBrand] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check login status

  // Fetch product details
  const getProductDetails = async () => {
    const id = params.id;
    try {
      const apiResData = await getApiData(`product/${id}`);
      if (apiResData) {
        setView(apiResData);
        setBrand(apiResData?.brand);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  // Check for token in local storage
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If token exists, set logged-in state to true
  };

  useEffect(() => {
    getProductDetails();
    checkLoginStatus(); // Check login status when component mounts
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
                    <img
                    src={ view?.images?.[0] ? `${baseUrl}/${view.images[0]}` : '/placeholder.jpg'}    

                      alt=""
                    />
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
                        {/* <div className="badges">Description</div> */}
                        <div className="product-status-content">
                          <i className="icon-lightning" />
                          <p className="">{view?.description}</p>
                        </div>
                      </div>
                      <div className="tf-product-info-price">
                        <div className="price-on-sale"> ₹ {view?.price}</div>
                      </div>
                      <div className="tf-product-info-liveview">
                        <div style={{ fontSize: "20px" }} className="">
                          Status
                        </div>
                        <p
                          style={{
                            fontSize: "20px",
                            color: "green ",
                            borderBottom: "2px solid green",
                          }}
                          className=""
                        >
                          {view?.status}
                        </p>
                      </div>

                      <div className="tf-product-info-buy-button">
                        <form className="">
                          {isLoggedIn ? (
                            // Show "Place Order" if logged in
                            <Link
                              href="#"
                              className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                            >
                              <span>Place Order</span>
                            </Link>
                          ) : (
                            // Show "Order Enquiry" if not logged in
                            <Link
                              href="/enquiry"
                              className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                            >
                              <span>Order Enquiry</span>
                            </Link>
                          )}
                        </form>
                      </div>

                      <div className="tf-product-info-delivery-return">
  <div className="row">
    <div className="col-xl-6 col-12">
      <div className="tf-product-delivery">
        <div className="icon">
          <i className="icon-delivery-time" />
        </div>
        <p>
          Estimate delivery times: <span className="fw-7">12-26 days</span>{" "}
          (International), <span className="fw-7">3-6 days</span> (India).
        </p>
      </div>
    </div>
    <div className="col-xl-6 col-12">
      <div className="tf-product-delivery mb-0">
        <div className="icon">
          <i className="icon-return-order" />
        </div>
        <p>
          Return within <span className="fw-7">30 days</span> of purchase.
          Duties &amp; taxes are non-refundable.
        </p>
      </div>
    </div>
  </div>
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
  );
};

export default Page;
