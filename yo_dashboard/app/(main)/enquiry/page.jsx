"use client"
import { postApiData } from '@/helper/common';
import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [bname, setBname] = useState('');
  const [bgst, setBgst] = useState('');
  const [address, setAddress] = useState('');
  const [unit, setUnit] = useState('');
  const [status, setStatus] = useState(true);
  const [enquiry_date, setenquiry_date] = useState('12-09-2024');



  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const apiData = {
      title: title,
      contact: contact,
      email: email,
      bname: bname,
      bgst: bgst,
      address: address,
      unit: unit,
      enquiry_date:enquiry_date,
      name:name
    };

    try {
      const data = await postApiData("productenq/add", apiData, "application/json");
      if (data.success === true) {
        toast.success(data.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
       
      } else {
        toast.error(data.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (errorData) {
      toast.error(errorData.error, {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };

  return (
    <>
      <div id="wrapper">
        {/* <div className="tf-page-title style-2">
          <div className="container-full">
            <div className="heading text-center">Enquiry</div>
          </div>
        </div> */}

        {/* form */}
        <section className="flat-spacing-6">
          <div className="container">
            <div className="tf-grid-layout gap30 lg-col-2">
              <div className="tf-content-left">
                <img
                  style={{ height: '80vh', width: '100%' }}
                  src="https://t4.ftcdn.net/jpg/05/40/73/45/360_F_540734587_7dn1WOuUtAPHeAiLnGxZqxAZ1wRjxYTZ.jpg"
                  alt=""
                />
              </div>
              <div className="tf-content-right">
                <h5 className="mb_20">Enquiry Form</h5>
                <p className="mb_24">
                  If you’ve got great products you’re making or looking to work
                  with us then drop us a line.
                </p>
                <div>
                  <form className="form-contact" onSubmit={handleSubmit}>
                   
                    <div className="d-flex gap-15 mb_15">
                    <fieldset className="w-100">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          onChange={(e)=>setName(e.target.value)}
                          required
                          placeholder="Add Tittle *"
                         
                        />
                      </fieldset>

                      
                     
                    </div>


                    <div className="d-flex gap-15 mb_15">
                      <fieldset className="w-100">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={title}
                          onChange={(e)=>setTitle(e.target.value)}
                          required
                          placeholder="Name *"
                         
                        />
                      </fieldset>

                      
                      <fieldset className="w-100">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}

                          required
                          placeholder="Email *"
                        
                        />
                      </fieldset>
                    </div>
                    <div className="d-flex gap-15 mb_15">
                      <fieldset className="w-100">
                        <input
                          type="text"
                          name="contact"
                          id="contact"
                          value={contact}
                          onChange={(e)=>setContact(e.target.value)}
                          required
                          placeholder="Contact *"
                         
                        />
                      </fieldset>
                      <fieldset className="w-100">
                        <input
                          type="text"
                          name="bname"
                          value={bname}
                          onChange={(e)=>setBname(e.target.value)}
                          id="bname"
                          required
                          placeholder="Business Name *"
                          
                        />
                      </fieldset>
                    </div>

                    <div className="d-flex gap-15 mb_15">
                      <fieldset className="w-100">
                        <input
                          type="text"
                          name="bgst"
                          id="bgst"
                          value={bgst}
                          onChange={(e)=>setBgst(e.target.value)}
                          required
                          placeholder="GST Number *"
                        
                        />
                      </fieldset>
                      <fieldset className="w-100">
                        <input
                          type="text"
                          name="address"
                          value={address}
                          onChange={(e)=>setAddress(e.target.value)}
                          id="address"
                          required
                          placeholder="Address *"
                         
                        />
                      </fieldset>
                    </div>

                    <div className="d-flex gap-15 mb_15">
                      <fieldset className="w-100">
                        <input
                          type="text"
                          name="unit"
                          id="unit"
                          required
                          value={unit}
                          onChange={(e)=>setUnit(e.target.value)}
                          placeholder="Unit *"
                          
                        />
                      </fieldset>
                      <fieldset className="w-100">
                        <input
                          type="date"
                          name="enquiry_date"
                          id="enquiry_date"
                          value={enquiry_date}
                          onChange={(e)=>setenquiry_date(e.target.value)}
                          required
                         
                        />
                      </fieldset>
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
      </div>
    </>
  );
};

export default Page;
