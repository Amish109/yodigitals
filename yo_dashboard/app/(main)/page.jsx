"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import background from "@/public/images/new/loginimg.png";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LogInForm from "@/components/auth/login-form";
import Header from './components/Header'
import Product from './components/Product'
import Slider from './components/Slider'

const LoginPage = () => {
  const [openVideo, setOpenVideo] = useState(false);
  return (
    <>
   
    
    <Product/>
    </>
  );
};

export default LoginPage;
