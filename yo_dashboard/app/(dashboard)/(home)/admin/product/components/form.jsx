"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FileUploader } from "react-drag-drop-files";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ProductAdd = () => {
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
            <Label htmlFor="transRef">
            Title
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              size="lg"
              id="transRef"
              required
              value={transRef}
              onChange={(e) => setTransRef(e.target.value)}
              placeholder="Title"
            />
           
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">
             Price
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
               size="lg"
              id="Price"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Price"
            />
           
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">
             Discount
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="Price"
               size="lg"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Discount"
            />
           
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">
             Categories
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="Price"
               size="lg"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Categories"
            />
           
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">
            More products
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="Price"
                  size="lg"

              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="More products"
            />
           
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">
            Meta description
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="Price"
                  size="lg"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Meta description"
            />
           
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">
            Keywords (comma separated values e.g. new,cool,fancy)
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="Price"
                  size="lg"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Meta description"
            />
           
          </div>



          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">
             Stock
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="Price"
                  size="lg"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Stock"
            />
           
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">
            Distributor Price
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="Price"
                  size="lg"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Distributor Price"
            />
           
          </div>

          

         

         

        </div>
<div className="grid grid-cols-1 lg:grid-cols-1 gap-4">

<div className="flex flex-col gap-2 mt-5">
            <Label htmlFor="amount">
           Description
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Textarea placeholder="Type Here.." rows="3" />
           
          </div>
<div className="flex flex-col gap-3 mb-5">
            <Label>
             Upload Image
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
          style={{ margin: "auto", width: "100%", gap: "20px" }}
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

export default ProductAdd;