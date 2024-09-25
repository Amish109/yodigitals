"use client";
import Image from "next/image";
import background from "@/public/images/new/loginimg.png";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Page = () => {
  const totalOtpField = 6;
  const otpArray = Array.from({ length: totalOtpField }, () => "");
  const [otp, setOtp] = useState(otpArray);
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const inputRefs = useRef([]);

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

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      setOtp(prevOtp => {
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

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Simulate sending OTP
    console.log("Email submitted:", email);
    setIsOtpSent(true);
    // Reset OTP fields
    setOtp(otpArray);
    inputRefs.current[0].focus();
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    
    
    if (enteredOtp === "123456") { // Dummy check for OTP
      alert("OTP verified successfully!");
      
    } else {
      alert("Invalid OTP. Please try again.");
      setOtp(otpArray); // Reset OTP fields on failure
      inputRefs.current[0].focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <>
      <div className="min-h-screen bg-background flex items-center overflow-hidden w-full">
        <div className="min-h-screen basis-full flex flex-wrap w-full justify-center overflow-y-auto">
          <div className="basis-1/2 bg-primary w-full relative hidden xl:flex justify-center items-center bg-gradient-to-br from-primary-600 via-primary-400 to-primary-600">
            <Image src={background} alt="image" className="absolute top-0 left-0 w-full h-full" />
          </div>

          <div className="min-h-screen basis-full md:basis-1/2 w-full px-4 py-5 flex justify-center items-center">
            <div className="lg:w-[480px]">
              <div className="2xl:mt-8 mt-6 text-2xl font-bold text-default-900 text-center">
                {isOtpSent ? "Verify Your OTP" : "Enter Registered Mobile Number"}
              </div>

              {!isOtpSent ? (
                <form onSubmit={handleEmailSubmit} className="mt-5">
                  <div>
                    <Label htmlFor="email" className="mb-2 font-medium text-default-600">
                      Enter User Email{" "}
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter Email Id"
                      size="lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop:"20px" }}>
                    <Button type="submit" className="w-full">Continue</Button>
                  </div>
                  <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
  Already Registered?{" "}
  <a className="text-primary" href="/admin">
    {" "}
    Sign In{" "}
  </a>
</div>

                </form>
              ) : (
                <form className="mt-8">
                  <div className="flex flex-wrap gap-1 lg:gap-6">
                    {otp.map((_, index) => (
                      <Input
                        key={`otp-code-${index}`}
                        type="text"
                        id={`otp${index}`}
                        name={`otp${index}`}
                        value={otp[index]}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(event) => handleKeyDown(index, event)}
                        maxLength={1}
                        className="w-10 h-10 sm:w-[60px] sm:h-16 rounded border-default-300 text-center text-2xl font-medium text-default-900"
                        ref={(ref) => (inputRefs.current[index] = ref)}
                      />
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button
                      type="button"
                      className="w-full"
                      size="lg"
                      onClick={handleSubmit}
                      disabled={!isOtpComplete}
                    >
                      Verify Now
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;