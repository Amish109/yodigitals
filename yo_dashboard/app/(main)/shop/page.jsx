"use client";
import React, { useEffect, useState } from "react";
import { deleteApiData, getApiData, postApiData } from "@/helper/common";
import ProductItem from "../components/ProductItem";

const page = () => {
  const [data, setData] = useState([]);
  const [catdata, setCatData] = useState([]);
  const [error, setError] = useState(null);

  const fetchProductList = async () => {
    try {
      const apiResData = await getApiData(`product/list`);
      if (apiResData.success === true) {
        setData(apiResData?.products);
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



  return (
    <>
      <div id="wrapper">
        {/* /header */}
        {/* page-title */}
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
              {/* fiter tha */}
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
                    <ul className="list-categoris current-scrollbar mb_36">
                      {catdata.map((item, index) => (
                        <li key={index} className="cate-item current">
                          <a href="#">
                            <span>{item.name}</span>
                          </a>
                        </li>
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
                      <span className="icon icon-arrow-up" />
                    </div>
                    <div id="availability" className="collapse show">
                      <ul className="tf-filter-group current-scrollbar mb_36">
                        <li className="list-item d-flex gap-12 align-items-center">
                          <input
                            type="radio"
                            name="availability"
                            className="tf-check"
                            id="availability-1"
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
                <div className="grid-layout wrapper-shop" data-grid="grid-4">
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
                      <p>Product Not Found</p>
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
