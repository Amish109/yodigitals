import Image from 'next/image'
import React from 'react'

const Slider = () => {
  return (
    <>
    <div className="tf-slideshow slider-home-2 slider-effect-fade position-relative">
  <div
    className="swiper tf-sw-slideshow"
    data-preview={1}
    data-tablet={1}
    data-mobile={1}
    data-centered="false"
    data-space={0}
    data-loop="true"
    data-auto-play="true"
    data-delay={2000}
    data-speed={1000}
  >
    <div className="swiper-wrapper">
      <div className="swiper-slide" lazy="true">
        <div className="wrap-slider">
          <img style={{height:"400px"}}
            className="lazyload"
            data-src="https://i.pinimg.com/originals/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg"
           
            src="https://i.pinimg.com/originals/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg"
            alt="fashion-slideshow-01"
           
          />
          <div className="box-content">
            <div className="container">
              <p className="fade-item fade-item-1">
                UP TO 40% OFF CHARGERS AND MORE.
              </p>
              <h1 className="fade-item fade-item-2">
                Savings for
                <br /> dads and grads.
              </h1>
              <a
                href="shop-default.html"
                className="fade-item fade-item-3 rounded-full tf-btn btn-fill animate-hover-btn btn-xl radius-3"
              >
                <span>Shop collection</span>
                <i className="icon icon-arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    
    
    </div>
  </div>
  <div className="wrap-pagination sw-absolute-2">
    <div className="container">
      <div className="sw-dots sw-pagination-slider justify-content-center" />
    </div>
  </div>
</div>

    </>
  )
}

export default Slider