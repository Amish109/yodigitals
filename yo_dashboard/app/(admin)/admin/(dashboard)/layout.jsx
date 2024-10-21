"use client"
import { useRouter } from "next/navigation";
import MainLayout from "./main-layout";
import { useEffect } from "react";


<<<<<<< HEAD
const Layout = ({ children }) => {
=======

const Layout = ({ children }) => {


  
>>>>>>> 32146da7f3d03a1af460fdecd3e1c24fe9dac0f9
  // const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     // If token exists, redirect to /admin/dashboard
  //     router.push("/admin/dashboard");
  //   } else {
  //     // If no token, redirect to /
  //     router.push("/");
  //   }
  // }, [router]);

  return <MainLayout>{children}</MainLayout>;
};

export default Layout;
