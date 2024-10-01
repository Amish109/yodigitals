"use client";
import React from "react";
import { SiteLogo } from "@/components/svg";
import { Loader2 } from "lucide-react";
import img1 from '../public/logo1.ico'
import Image from "next/image";
const LayoutLoader = () => {
  return (
    <div className=" h-screen flex items-center justify-center flex-col space-y-2">
      {/* <img className=" h-10 w-10 text-primary" /> */}
      <Image style={{borderRadius:"10px"}} className="h-16 w-16 text-primary" src={img1}></Image>
      <span className=" inline-flex gap-1">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Yo Digital Loading Now...
      </span> 
    </div> 
  ); 
}; 

export default LayoutLoader;
