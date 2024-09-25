"use client";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { getApiData, postApiData } from "@/helper/common";
import Image from "next/image";
import background from "@/public/images/new/loginimg.png";

const Page = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const FetchUserList = async () => {
    try {
      const apiResData = await getApiData(`users`);
      if (apiResData.success) {
        setData(apiResData.users);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    FetchUserList();
  }, []);

  const onCaptchVerify = () => {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Firebase auth initialized:", auth);
    }
  }, []);

  const onSignup = () => {
    const userExists = data.some((user) => user.phoneNumber == ph);

    console.log(userExists, "userexist", ph, "phone");

    if (!userExists) {
      setError("Invalid user: Phone number does not exist.");
      return;
    }

    setLoading(true);
    onCaptchVerify();

    if (typeof window !== "undefined") {
      const appVerifier = window.recaptchaVerifier;
      const formatPh = "+" + ph;

      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP sent successfully!");
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError("Failed to send OTP. Please try again.");
        });
    }
  };

  const onOTPVerify = () => {
    setLoading(true);
    if (typeof window !== "undefined" && window.confirmationResult) {
      window.confirmationResult
        .confirm(otp)
        .then(async (res) => {
          console.log(res);
          setUser(res.user);
          setLoading(false);

          const apiData = {
            otp: otp,
            phoneNumber: ph,
          };

          try {
            const data = await postApiData(
              "users/phone-number",
              apiData,
              "application/json"
            );
            if (data.success === true) {
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
          } catch (error) {
            console.log("error");
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          setError("Invalid OTP. Please try again.");
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

          <div className="basis-1/2 bg-white w-full relative hidden xl:flex justify-center items-center">
            <section className="bg-white flex items-center justify-center">
              <div>
                <Toaster toastOptions={{ duration: 4000 }} />
                <div id="recaptcha-container"></div>

                <div className="w-120 flex flex-col gap-4 rounded-lg p-4">
                  <h1 className="text-center leading-normal text-black font-medium text-3xl mb-6">
                    Welcome to Yo Digitals
                  </h1>

                  <p style={{ textAlign: "center", fontSize: "17px" }}>
                    Thank you for registering on our website! <br /> Here's your
                    promotional code for your first purchase.
                  </p>
                  {showOTP ? (
                    <>
                      <div className="bg-white text-primary-500 w-fit mx-auto p-4 rounded-full">
                        <BsFillShieldLockFill size={30} />
                      </div>
                      <label
                        htmlFor="otp"
                        className="font-bold text-xl text-black text-center"
                      >
                        Enter your OTP
                      </label>
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        inputStyle="border border-black rounded-md p-2 w-12 h-12 text-center"
                        className="opt-container border-black"
                      />
                      <button
                        onClick={onOTPVerify}
                        className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-black rounded"
                      >
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Verify OTP</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="bg-white text-black w-fit mx-auto p-4 rounded-full">
                        <BsTelephoneFill size={30} />
                      </div>
                      <label
                        htmlFor=""
                        className="font-bold text-xl text-black text-center"
                      >
                        Verify your phone number
                      </label>
                      <PhoneInput
                        className="mx-12"
                        country={"in"}
                        value={ph}
                        onChange={setPh}
                      />
                      {error && <p className="text-red-500">{error}</p>}
                      <button
                        onClick={onSignup}
                        className="bg-black w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                      >
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Send code via SMS</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
