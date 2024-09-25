import Link from 'next/link'
import React from 'react'

const RoleBase = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
   
  return (
    <>
      <div className="blog-grid-main">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-md-4 col-12">
            <div className="blog-article-item">
              <div className="article-thumb">
                <Link href={token ? '/admin/dashboard' : '/admin'}>
                  <img
                    className="lazyload"
                    data-src="https://yodigitals.com/_next/static/media/top1.16dd6294a3fd232f4cfc4fa83b8fdc81.jpg"
                    src="https://yodigitals.com/_next/static/media/top1.16dd6294a3fd232f4cfc4fa83b8fdc81.jpg"
                    alt="img-blog"
                  />
                </Link>
                <div className="article-label">
                  <Link
                    href="/admin"
                    className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn"
                  >
                    Login Dealer
                  </Link>
                </div>
              </div>
             
            </div>
          </div>
         
          <div className="col-xl-3 col-md-4 col-12">
            <div className="blog-article-item">
              <div className="article-thumb">
                <Link  href="/enquiry">
                  <img
                    className="lazyload"
                    data-src="https://yodigitals.com/_next/static/media/top1.16dd6294a3fd232f4cfc4fa83b8fdc81.jpg"
                    src="https://yodigitals.com/_next/static/media/top1.16dd6294a3fd232f4cfc4fa83b8fdc81.jpg"
                    alt="img-blog"
                  />
                </Link>
                <div className="article-label">
                  <Link
                     href="/enquiry"
                    className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn"
                  >
                    Dealer Connect
                  </Link>
                </div>
              </div>
             
            </div>
          </div>
          <div className="col-xl-3 col-md-4 col-12">
            <div className="blog-article-item">
              <div className="article-thumb">
                
                  <img
                    className="lazyload"
                    data-src="https://yodigitals.com/_next/static/media/top1.16dd6294a3fd232f4cfc4fa83b8fdc81.jpg"
                    src="https://yodigitals.com/_next/static/media/top1.16dd6294a3fd232f4cfc4fa83b8fdc81.jpg"
                    alt="img-blog"
                  />
              
                <div className="article-label">
                  <Link target='_blank'
                    href="https://shop.yodigitals.com/"
                    className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn"
                  >
                    Customers
                  </Link>
                </div>
              </div>
             
            </div>
          </div>
         
          <div className="col-xl-3 col-md-4 col-12">
            <div className="blog-article-item">
              <div className="article-thumb">
                <Link  href="/enquiry">
                  <img
                    className="lazyload"
                    data-src="https://yodigitals.com/_next/static/media/top1.16dd6294a3fd232f4cfc4fa83b8fdc81.jpg"
                    src="https://yodigitals.com/_next/static/media/top1.16dd6294a3fd232f4cfc4fa83b8fdc81.jpg"
                    alt="img-blog"
                  />
                </Link>
                <div className="article-label">
                  <Link
                    href="/enquiry"
                    className="tf-btn btn-sm radius-3 btn-fill animate-hover-btn"
                  >
                    Corporate
                  </Link>
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

export default RoleBase