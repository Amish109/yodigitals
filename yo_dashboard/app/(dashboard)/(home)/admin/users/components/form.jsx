"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FileUploader } from "react-drag-drop-files";
import { Input } from "@/components/ui/input";

const UserAdd = () => {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [amount, setAmount] = useState("");
  const [transRef, setTransRef] = useState("");
  const [comment, setComment] = useState("");

  const [screenShotImg, setscreenShotImg] = useState(null);
  const [errors, setErrors] = useState({
    amount: "",
    transRef: "",
    comment: "",
    screenShotImg: "",
  });

 
  const handleImageChange = (setImage, image) => {
    setImage(image);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
      const apiData = new FormData();
      apiData.append("amount", amount);
      apiData.append("transRef", transRef);
      apiData.append("comment", comment);
      try {
        const data = await postApiFormDataToken("", apiData);
        if (data.error === false) {
          toast.success(data.message, {
            position: "bottom-center",
            style: { borderRadius: "10px", background: "#333", color: "#fff" },
          });
          setComment(null);
          setAmount(null);
          setTransRef(null);
        } else {
          toast.error(data.message, {
            position: "bottom-center",
            style: { borderRadius: "10px", background: "#333", color: "#fff" },
          });
        }
      } catch (errorData) {
        toast.error(errorData.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          

        <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            First Name
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={("First Name")}
            />
           
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Business Name
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={("Business Name")}
            />
           
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Aadhar Number
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={("Aadhar Number")}
            />
           
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Last Name
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={("Last Name")}
            />
           
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Business Address
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={("Business Address")}
            />
           
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Phone Number
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="tel"
              id="comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder={("Phone Number")}
            />
           
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            CIN
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="tel"
              id="comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder={("CIN")}
            />
           
          </div>



          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            E-mail
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="tel"
              id="comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder={("E-mail")}
            />
           
          </div>



          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            GSTIN
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="tel"
              id="comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder={("GSTIN")}
            />
           
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Password
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="password"
              id="comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder={("Password")}
            />
           
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Balance
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="password"
              id="comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder={("Balance")}
            />
           
          </div>



          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Date
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="date"
              id="comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder={("Date")}
            />
           
          </div>
          

          <div className="flex flex-col gap-3 mb-5">
            <Label>
            Aadhar Front
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <FileUploader
              handleChange={(image) =>
                handleImageChange(setscreenShotImg, image)
              }
              name="image"
              types={fileTypes}
            />
            {screenShotImg && (
              <img
                src={URL.createObjectURL(screenShotImg)}
                width="100px"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #ccc",
                }}
              />
            )}
          </div>

          <div className="flex flex-col gap-3 mb-5">
            <Label>
            Aadhar Back
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <FileUploader
              handleChange={(image) =>
                handleImageChange(setscreenShotImg, image)
              }
              name="image"
              types={fileTypes}
            />
            {screenShotImg && (
              <img
                src={URL.createObjectURL(screenShotImg)}
                width="100px"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #ccc",
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-3 mb-5">
            <Label>
            Avatar
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <FileUploader
              handleChange={(image) =>
                handleImageChange(setscreenShotImg, image)
              }
              name="image"
              types={fileTypes}
            />
            {screenShotImg && (
              <img
                src={URL.createObjectURL(screenShotImg)}
                width="100px"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #ccc",
                }}
              />
            )}
          </div>

        </div>

        <div
          style={{ margin: "auto", width: "300px", gap: "20px" }}
          className="mt-5 flex justify-center"
        >
          <Button style={{ margin: "auto" }} className="mx-5" type="submit">
            {("Submit")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserAdd;