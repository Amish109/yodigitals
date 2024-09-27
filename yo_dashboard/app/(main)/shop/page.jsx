"use client";
import React, { useEffect, useState } from "react";
import { deleteApiData, getApiData, postApiData } from "@/helper/common";
import ProductItem from "../components/ProductItem";
import Link from "next/link";
import Loader from "../components/Loader";

const page = () => {
  const [data, setData] = useState([]);
  const [catdata, setCatData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchProductList = async (status = "", categorySlug = "") => {
    try {
      // Construct the query string based on status and categorySlug
      const query = new URLSearchParams();
      if (status) query.append("status", status);
      if (categorySlug) query.append("categorySlug", categorySlug);

      const apiResData = await getApiData(`product/list?${query.toString()}`);
      setLoading(false)
      if (apiResData.success === true) {
        setData(apiResData?.products);
      } else {
        setData([]);
        setLoading(false)
        setError(apiResData.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setError("Error fetching data");
    }
  };

  // Handle category filter
  const handleCategoryFilter = (categorySlug) => {
    fetchProductList("", categorySlug);
  };

  // Handle status filter
  const handleStatusFilter = (status) => {
    fetchProductList(status);
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchCategoriesList = async () => {
    try {
      const apiResData = await getApiData(`categories`);
      if (apiResData.success === true) {
        setCatData(apiResData?.categories);
      } else {
        setCatData([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchCategoriesList();
  }, []);



  if (loading) {
    return <Loader />;
  }



  return (
    <>
      <div id="wrapper">
        <div className="tf-page-title">
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <div className="heading text-center">New Arrival</div>
                <p className="text-center text-2 text_black-2 mt_5">
                  Shop through our latest selection of products
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="flat-spacing-1">
          <div className="container">
            <div className="tf-shop-control grid-3 align-items-center">
              <div />

              <ul className="tf-control-layout d-flex justify-content-center">
                <li
                  className="tf-view-layout-switch sw-layout-2"
                  data-value-grid="grid-2"
                >
                  <div className="item">
                    <span className="icon icon-grid-2" />
                  </div>
                </li>
                <li
                  className="tf-view-layout-switch sw-layout-3"
                  data-value-grid="grid-3"
                >
                  <div className="item">
                    <span className="icon icon-grid-3" />
                  </div>
                </li>
                <li
                  className="tf-view-layout-switch sw-layout-4 active"
                  data-value-grid="grid-4"
                >
                  <div className="item">
                    <span className="icon icon-grid-4" />
                  </div>
                </li>
                <li
                  className="tf-view-layout-switch sw-layout-5"
                  data-value-grid="grid-5"
                >
                  <div className="item">
                    <span className="icon icon-grid-5" />
                  </div>
                </li>
                <li
                  className="tf-view-layout-switch sw-layout-6"
                  data-value-grid="grid-6"
                >
                  <div className="item">
                    <span className="icon icon-grid-6" />
                  </div>
                </li>
              </ul>
            </div>
            <div className="blog-sidebar-main p-0">
              <div className="tf-section-sidebar wrap-sidebar-mobile flex-shrink-0">
                <div className="widget-facet wd-categories">
                  <div
                    className="facet-title"
                    data-bs-target="#categories"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="categories"
                  >
                    <span>Product categories</span>
                    <span className="icon icon-arrow-up" />
                  </div>
                  <div id="categories" className="collapse show">
                    <ul className="list-categories current-scrollbar mb_36">
                      {catdata.map((item, index) => (
                        <>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="grey" fill-rule="evenodd" d="M17 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8M3 17a4 4 0 1 1 8 0a4 4 0 0 1-8 0m10-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2zM3 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" clip-rule="evenodd"/></svg>
                            </div>
                            <div>
                              <li
                                key={index}
                                className="cate-item current"
                                onClick={() => handleCategoryFilter(item.slug)} // Filter by category slug
                              >
                                <Link style={{ color: "black" }} href="#">
                                  <span>{item.name}</span>
                                </Link>
                              </li>
                            </div>
                          </div>
                        </>
                      ))}
                    </ul>
                  </div>
                </div>
                <form
                  action="#"
                  id="facet-filter-form"
                  className="facet-filter-form"
                >
                  <div className="widget-facet">
                    <div
                      className="facet-title"
                      data-bs-target="#availability"
                      data-bs-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="availability"
                    >
                      <span>Availability</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="m9.55 17.308l-4.97-4.97l.714-.713l4.256 4.256l9.156-9.156l.713.714z"/></svg>
                    </div>
                    <div id="availability" className="collapse show">
                      <ul className="tf-filter-group current-scrollbar mb_36">
                        <li className="list-item d-flex gap-12 align-items-center">
                          <input
                            type="radio"
                            name="availability"
                            className="tf-check"
                            id="availability-1"
                            onClick={() => handleStatusFilter("in stock")}
                          />
                          <label htmlFor="availability-1" className="label">
                            <span>In stock</span>&nbsp;<span>(14)</span>
                          </label>
                        </li>
                        <li className="list-item d-flex gap-12 align-items-center">
                          
                          <input
                            type="radio"
                            name="availability"
                            className="tf-check"
                            id="availability-2"
                            onClick={() => handleStatusFilter("out of stock")}
                          />
                          <label htmlFor="availability-2" className="label">
                            <span>Out of stock</span>&nbsp;<span>(2)</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <div className="grid-layout wrapper-shop"  data-grid={data && data.length > 0 ? "grid-4" : "undefined text-center"}>
                  {data && data.length > 0 ? (
                    data.map((item, index) => {
                      const images = Array.isArray(item.images)
                        ? item.images
                        : item.images
                        ? item.images.split(",")
                        : [];

                      return (
                        <ProductItem
                          item={item}
                          index={index}
                          images={images}
                        />
                      );
                    })
                  ) : (
                    <>
                      <div  data-grid="grid-12">
                        <img
                          style={{ margin: "auto", marginLeft:"50px" }}
                          className="not-founf"
                          src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727049600&semt=ais_hybrid"
                          alt="No data"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="btn-sidebar-mobile start-0">
          <a
            href="#filterShop"
            data-bs-toggle="offcanvas"
            aria-controls="offcanvasLeft"
          >
            <button className="type-hover">
              <i className="icon-open" />
              <span className="fw-5">Open sidebar</span>
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default page;
