// import './global.css';
// import "./assets/scss/globals.scss";
import "../../public/assets/css/bootstrap-select.min.css";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/drift-basic.min.css";
import "../../public/assets/css/image-compare-viewer.min.css";
import "../../public/assets/css/photoswipe.css";
import "../../public/assets/css/styles.css";
import "../../public/assets/css/swiper-bundle.min.css";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import Providers from "@/provider/providers";
import "simplebar-react/dist/simplebar.min.css";
import TanstackProvider from "@/provider/providers.client";
import AuthProvider from "@/provider/auth.provider";
import "flatpickr/dist/themes/light.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <TanstackProvider>
          <Providers>
            <Header></Header>
            {children}
            <Footer/>
            </Providers>
        </TanstackProvider>
      </AuthProvider>
    </html>
  );
}
