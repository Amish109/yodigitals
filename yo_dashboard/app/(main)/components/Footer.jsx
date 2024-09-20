import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <>
    <footer id="footer" className="footer background-black">
  <div className="footer-wrap wow fadeIn" data-wow-delay="0s">
    <div className="footer-body">
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-md-6 col-12">
            <div className="footer-infor">
              <div className="footer-logo">
                <Link href="index">
                  <img src="https://yodigitals.com/_next/static/media/yo_logoo.95ffa7e61c58c080eed908e433ed63e0.svg" alt="" />
                </Link>
              </div>
              
              <ul>
                <li>
                  <p>
                  09, Basement Ashoka Shopping Centre, Lokmanya Tilak Rd, Mumbai, Maharashtra 400001
                  </p>
                </li>
                <li>
                  <p>
                    Email: <Link href="#">yodigitals.com</Link>
                  </p>
                </li>
                <li>
                  <p>
                    Phone: <Link href="#">+91 9987957863</Link>
                  </p>
                </li>
              </ul>
              <Link href="contact-1" className="tf-btn btn-line">
              Follow us
                <i className="icon icon-arrow1-top-left" />
              </Link>
              <ul className="tf-social-icon d-flex gap-10 style-white">
                <li>
                  <Link
                    href="#"
                    className="box-icon w_34 round social-facebook social-line"
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M8 2H1l8.26 11.015L1.45 22H4.1l6.388-7.349L16 22h7l-8.608-11.478L21.8 2h-2.65l-5.986 6.886zm9 18L5 4h2l12 16z"/></svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="box-icon w_34 round social-twiter social-line"
                  >
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="box-icon w_34 round social-instagram social-line"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="white"><path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"/><path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01"/></g></svg>
                  </Link>
                </li>
              
              
              </ul>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-12 footer-col-block">
            <div className="footer-heading footer-heading-desktop">
              <h6>Help</h6>
            </div>
            <div className="footer-heading footer-heading-moblie">
              <h6>Help</h6>
            </div>
            <ul className="footer-menu-list tf-collapse-content">
              <li>
                <Link href="privacy-policy" className="footer-menu_item">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="delivery-return" className="footer-menu_item">
                  {" "}
                  Returns + Exchanges{" "}
                </Link>
              </li>
              <li>
                <Link href="shipping-delivery" className="footer-menu_item">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="terms-conditions" className="footer-menu_item">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="faq-1" className="footer-menu_item">
                  FAQ’s
                </Link>
              </li>
            
            </ul>
          </div>
          <div className="col-xl-3 col-md-6 col-12 footer-col-block">
            <div className="footer-heading footer-heading-desktop">
              <h6>About us</h6>
            </div>
            <div className="footer-heading footer-heading-moblie">
              <h6>About us</h6>
            </div>
            <ul className="footer-menu-list tf-collapse-content">
              <li>
                <Link href="about-us" className="footer-menu_item">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="our-store" className="footer-menu_item">
                  Visit Our Store
                </Link>
              </li>
              <li>
                <Link href="contact-1" className="footer-menu_item">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="login" className="footer-menu_item">
                  Account
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-xl-3 col-md-6 col-12">
            <div className="footer-newsletter footer-col-block">
              <div className="footer-heading footer-heading-desktop">
                <h6>Subscribe Yo Digitals</h6>
              </div>
            
              <div className="tf-collapse-content">
                <div className="footer-menu_item">
                
                </div>
                <form
                  className="form-newsletter"
                  id="subscribe-form"
                  action="#"
                  method="post"
                  acceptCharset="utf-8"
                  data-mailchimp="true"
                >
                  <div id="subscribe-content">
                    <fieldset className="email">
                      <input
                        type="email"
                        name="email-form"
                        id="subscribe-email"
                        placeholder="Enter your email...."
                        tabIndex={0}
                        aria-required="true"
                      />
                    </fieldset>
                    <div className="button-submit">
                      <button
                        id="subscribe-button"
                        className="tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn"
                        type="button"
                      >
                        Subscribe
                        <i className="icon icon-arrow1-top-left" />
                      </button>
                    </div>
                  </div>
                  <div id="subscribe-msg" />
                </form>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-bottom-wrap d-flex gap-20 flex-wrap justify-content-between align-items-center">
              <div className="footer-menu_item">
                © 2024 yodigitals Store. All Rights Reserved
              </div>
              <div className="tf-payment">
                <img src="images/payments/visa.png" alt="" />
                <img src="images/payments/img-1.png" alt="" />
                <img src="images/payments/img-2.png" alt="" />
                <img src="images/payments/img-3.png" alt="" />
                <img src="images/payments/img-4.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

    </>
  )
}

export default Footer