// src/components/Loader.js
import React from "react";
import img2 from '../../../public/logo1.ico'
import Image from "next/image";

const Loader = () => {
  const loaderContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const loaderStyle = {
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #3498db',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    animation: 'spin 1.5s linear infinite',
  };

  const keyframes = `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;

  return (
    <div style={loaderContainerStyle}>
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><path fill="black" d="M13 2h-2v6h2zm0 14h-2v6h2zm9-5v2h-6v-2zM8 13v-2H2v2zm7-6h2v2h-2zm4-2h-2v2h2zM9 7H7v2h2zM5 5h2v2H5zm10 12h2v2h2v-2h-2v-2h-2zm-8 0v-2h2v2zv2H5v-2z"/></svg>
      {/* <div style={loaderStyle}></div> */}
    </div>
  );
};

export default Loader;
