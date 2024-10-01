"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { postApiData } from "@/helper/common";

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");

  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handlerLogin = async (event) => {
    event.preventDefault();
    const apiData = { email, password };
    toast.dismiss();

    try {
      setLoading(true);

      const data = await postApiData("users/login", apiData);

      if (data.success == true) {
        toast.success(data.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user)); 
        }
        document.cookie = `token=${data.token}`;
         location.href = "/admin/dashboard";
      } else {
        toast.error(data.error, {
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
    <div className="w-full ">
      <div className="2xl:mt-2 mt-6 2xl:text-3xl text-2xl font-bold text-default-900 text-center">
        WELCOME
      </div>
      <div className="2xl:text-lg text-base text-default-600 2xl:mt-2 leading-6 text-center">
        Thank you for registering on our website! Here's your promotional code
        for your first purchase.
      </div>
      <form onSubmit={handlerLogin} className="mt-5 2xl:mt-7">
        <div>
          <Label
            htmlFor="unique_id"
            className="mb-2 font-medium text-default-600"
          >
            Enter User Email{" "}
          </Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            placeholder="Enter Email Id"
            className={cn("", {
              "border-destructive": errors.email,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
        </div>

        <div className="mt-3.5">
          <Label
            htmlFor="password"
            className="mb-2 font-medium text-default-600"
          >
            Password{" "}
          </Label>
          <div className="relative">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={passwordType}
              id="password"
              className="peer "
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder="Enter Password"
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
              onClick={togglePasswordType}
            >
              {passwordType === "text" ? (
                <Icon
                  icon="heroicons:eye"
                  className="w-5 h-5 text-default-400"
                />
              ) : (
                <Icon
                  icon="heroicons:eye-slash"
                  className="w-5 h-5 text-default-400"
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-5  mb-8 flex flex-wrap gap-2">
          <div className="flex-1 flex  items-center gap-1.5 ">
           
            <Label
              htmlFor="isRemebered"
              className="text-sm text-default-600 cursor-pointer whitespace-nowrap"
            >
              {/* Remember me */}
            </Label>
          </div>
          <Link href="/admin/forgot" className="flex-none text-sm text-primary">
            Forget Password?
          </Link>
        </div>
        <div style={{display:"flex", justifyContent:"", gap:"20px"}}>
     <div  className="w-1/2">
        <Button
        className="w-full"
          disabled={isPending}
         
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "Login"}
        </Button>
        </div>
   
       <div className="w-1/2">
       <Link  href="/admin/otp-login">
       <Button
        className="w-full"
        
        
        
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "OTP"}
        </Button>
       </Link>
       </div>
       </div>
      </form>

     
    </div>
  );
};

export default LogInForm;
