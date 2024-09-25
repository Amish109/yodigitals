"use client";
import Image from "next/image";
import background from "@/public/images/new/loginimg.png";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postApiData } from "@/helper/common";
import toast, { Toaster } from "react-hot-toast";
const Page = () => {
  const [email, setEmail] = useState("");




  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    const apiData = {
      email: email,
    };

    try {
      const data = await postApiData(
        "users/forgot-password",
        apiData,
        "application/json"
      );
      if (data.success === true) {
        toast.success(data.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        setEmail("")
      
      } else {
        toast.error(data.error, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (error) {
      toast.error(errorData.error, {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };



  
  return (
    <>
      <div className="min-h-screen bg-background flex items-center overflow-hidden w-full">
        <div className="min-h-screen basis-full flex flex-wrap w-full justify-center overflow-y-auto">
          <div className="basis-1/2 bg-primary w-full relative hidden xl:flex justify-center items-center bg-gradient-to-br from-primary-600 via-primary-400 to-primary-600">
            <Image
              src={background}
              alt="image"
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>

          <div className="min-h-screen basis-full md:basis-1/2 w-full px-4 py-5 flex justify-center items-center">
            <div className="lg:w-[480px]">
              <div className="2xl:mt-8 mt-6 text-2xl font-bold text-default-900 text-center">
              Forgot Password
              </div>

             
                <form onSubmit={handleForgotSubmit} className="mt-5">
                  <div>
                    <Label
                      htmlFor="email"
                      className="mb-2 font-medium text-default-600"
                    >
                      Enter User Email{" "}
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter Email Id"
                      size="lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "20px",
                      marginTop: "20px",
                    }}
                  >
                    <Button type="submit" className="w-full">
                      Continue
                    </Button>
                  </div>
                  <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
                    Already Registered?{" "}
                    <a className="text-primary" href="/admin">
                      {" "}
                      Sign In{" "}
                    </a>
                  </div>
                </form>
             
               
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
