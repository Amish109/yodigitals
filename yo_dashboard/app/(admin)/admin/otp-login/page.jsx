"use client";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { getApiData, postApiData } from "@/helper/common";
import Image from "next/image";
import background from "@/public/images/new/loginimg.png";

const page = () => {
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const totalOtpField = 6;
  const [otp, setOtp] = useState(Array(totalOtpField).fill(""));
  const inputRefs = useRef([]);

  // Fetch user list from the API
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

  // Ensure the captcha is only initialized in the client
  const onCaptchVerify = () => {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const onSignup = () => {
    const userExists = data.some((user) => user.phoneNumber == ph);

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
        .confirm(otp.join("")) // Join OTP array to a single string
        .then(async (res) => {
          setUser(res.user);
          setLoading(false);

          const apiData = {
            otp: otp.join(""),
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
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
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
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              });
            }
          } catch (error) {
            console.log("Error in OTP verification API call:", error);
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          setError("Invalid OTP. Please try again.");
        });
    }
  };

  // Handle OTP input changes
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value.length === 1 && index < totalOtpField - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle backspace and arrow navigation
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index - 1] = "";
        return newOtp;
      });
      inputRefs.current[index - 1].focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (event.key === "ArrowRight" && index < totalOtpField - 1) {
      inputRefs.current[index + 1].focus();
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

                  <div>
                    <p style={{ textAlign: "center", fontSize: "17px" }}>
                      To secure your account,
                      <br /> please verify your phone number. We'll send you a{" "}
                      <br /> One-Time Password (OTP) for secure access.
                    </p>
                  </div>
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

                      <div className="flex flex-wrap gap-1 lg:gap-6">
                        {Array.from({ length: totalOtpField }).map(
                          (_, index) => (
                            <Input
                              key={`otp-code-${index}`}
                              type="text"
                              id={`otp${index}`}
                              value={otp[index]}
                              onChange={(e) => handleChange(e, index)}
                              onKeyDown={(event) => handleKeyDown(index, event)}
                              maxLength={1}
                              className="w-8 h-8 sm:w-[60px] sm:h-12 rounded border-default-300 text-center text-2xl font-medium text-default-900"
                              ref={(ref) => (inputRefs.current[index] = ref)}
                            />
                          )
                        )}
                      </div>
                      <button
                        onClick={onOTPVerify}
                        className="bg-black w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
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
                      <div className="mx-auto  p-4">
                        <div className="mb-5">
                          <label
                            htmlFor=""
                            className="font-bold text-xl mx-5 text-black text-center"
                          >
                            Verify your phone number
                          </label>

                          <p style={{textAlign:"center", fontWeight:"bold", fontSize:"12px"}}>Once you submit your number, you’ll receive  an OTP <br /> via SMS to verify your login.</p>
                        </div>
                        <PhoneInput
                          className="mx-auto"
                          country={"in"}
                          value={ph}
                          onChange={setPh}
                        />
                        {error && <p className="text-red-500">{error}</p>}
                      </div>
                      <button
                        onClick={onSignup}
                        className="bg-black w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                      >
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Send OTP</span>
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

export default page;
