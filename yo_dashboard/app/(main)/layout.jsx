import { Inter } from "next/font/google";

import "../../public/assets/css/bootstrap.min.css";


// new
import "../../public/new/css/custom-style.css";
import "../../public/new/css/stylesheet.css";
import "../../public/new/css/responsive.css";
import "../../public/new/css/special-classes.css";
import "../../public/new/css/style.css"



// import "./assets/css/all.min.css";
 import "../(theme2)/theme2/assets/css/all.min.css";
import "../(theme2)/theme2/assets/css/animate.css";
import "../(theme2)/theme2/assets/css/bootstrap.min.css";
import "../(theme2)/theme2/assets/css/color.css";
import "../(theme2)/theme2/assets/css/magnific-popup.css";
import "../(theme2)/theme2/assets/css/main.css";
// import "./assets/css/main.css.map";
import "../(theme2)/theme2/assets/css/nice-select.css";
import "../(theme2)/theme2/assets/css/swiper-bundle.min.css";

import Theme2Page from "../(theme2)/theme2/component/Home";







import HeaderNab from "./component/HeaderNab";
import Footer from "./component/Footer";
import Link from "next/link";
import { getApiData } from "@/Helper/common";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tapir Recharge Software",
  description: "Tapir Recharge Software",
};

export default async function RootLayout({ children }) {

  const apiResData = await getApiData("theme-setting/single");
  // console.log(apiResData,"sdfghjkjhgfdfgh")

  // const themeData = await getApiData("web/get-theme-data");
  


  const renderTheme1 = (apiResData, children) => (
    <>
      <HeaderNab apiResData={apiResData} />
      {children}
      <Footer apiResData={apiResData} />
    </>
  );
  
  const renderTheme2 = (apiResData) => <Theme2Page apiResData={apiResData} />;
  
  // const renderTheme3 = (apiResData) => <Theme3 apiResData={apiResData} />;





  return (
    <html lang="en">
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="styled-components-container" />
      <script async
        // you might need to get a newer version
        src="https://kit.fontawesome.com/fbadad80a0.js"
        crossOrigin="anonymous"
      ></script>
      <title>
        Tapir Recharge Software
      </title>


      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />


      <body >

        
       
        {/* <HeaderNab companyData={themeData?.result} />

        {children}

        <Footer companyData={themeData?.result} /> */}


{apiResData?.result?.theme_id == "1"
          ? renderTheme1(apiResData, children)
          : apiResData?.result?.theme_id == "2"
          ? renderTheme2(apiResData)
          : apiResData?.result?.theme_id == "3"
          // ? renderTheme3(apiResData)
          // : renderTheme1(apiResData, children)
          }



      </body>

    </html>
  );
}