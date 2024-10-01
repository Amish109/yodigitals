"use client";
import { useEffect, useState } from "react";
import Product from './components/Product';
import Loader from './components/Loader';

const LoginPage = () => {
  
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   console.log("Loader mounted!");

  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //     console.log("Loader unmounted!");
  //   }, 100);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <>
    
      <Product />
    </>
  );
};

export default LoginPage;
