import React from 'react'

const page = () => {
  return (
    <>
    <div id="wrapper">
 
  <div className="tf-page-title style-2">
    <div className="container-full">
      <div className="heading text-center">Contact Us</div>
    </div>
  </div>

  {/* form */}
  <section className="flat-spacing-21">
    <div className="container">
      <div className="tf-grid-layout gap30 lg-col-2">
        <div className="tf-content-left">
          <h5 className="mb_20">Visit Our Store</h5>
          <div className="mb_20">
            <p className="mb_15">
              <strong>Address</strong>
            </p>
            <p>09, Basement Ashoka Shopping Centre, Lokmanya Tilak Rd, Mumbai, Maharashtra 400001</p>
          </div>
          <div className="mb_20">
            <p className="mb_15">
              <strong>Phone</strong>
            </p>
            <p>+91 9987957863</p>
          </div>
          <div className="mb_20">
            <p className="mb_15">
              <strong>Email</strong>
            </p>
            <p> yodigitals.com</p>
          </div>
         
          <div>
            <ul className="tf-social-icon d-flex gap-20 style-default">
              <li>
                <a
                  href="#"
                  className="box-icon link round social-facebook border-line-black"
                >
                  <i className="icon fs-14 icon-fb" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="box-icon link round social-twiter border-line-black"
                >
                  <i className="icon fs-12 icon-Icon-x" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="box-icon link round social-instagram border-line-black"
                >
                  <i className="icon fs-14 icon-instagram" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="box-icon link round social-tiktok border-line-black"
                >
                  <i className="icon fs-14 icon-tiktok" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="box-icon link round social-pinterest border-line-black"
                >
                  <i className="icon fs-14 icon-pinterest-1" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="tf-content-right">
          <h5 className="mb_20">Get in Touch</h5>
          <p className="mb_24">
            If you’ve got great products your making or looking to work with us
            then drop us a line.
          </p>
          <div>
            <form
              className="form-contact"
             
            >
              <div className="d-flex gap-15 mb_15">
                <fieldset className="w-100">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required=""
                    placeholder="Name *"
                  />
                </fieldset>
                <fieldset className="w-100">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required=""
                    placeholder="Email *"
                  />
                </fieldset>
              </div>
              <div className="mb_15">
                <textarea
                  placeholder="Message"
                  name="message"
                  id="message"
                  required=""
                  cols={30}
                  rows={10}
                  defaultValue={""}
                />
              </div>
              <div className="send-wrap">
                <button
                  type="submit"
                  className="tf-btn w-100 radius-3 btn-fill animate-hover-btn justify-content-center"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /form */}
  {/* Footer */}

  {/* /Footer */}
</div>

    </>
  )
}

export default page