"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FileUploader } from "react-drag-drop-files";
import { Input } from "@/components/ui/input";

const CategoriesAdd = () => {
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
            <Label htmlFor="Title">
            Title
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="Title"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={("Title")}
            />
           
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Meta description
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={("Meta description")}
            />
           
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Keywords (comma separated values e.g. new,cool,fancy)
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
            Meta Author
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={("Meta Author")}
            />
           
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Meta og title
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={("Meta og title")}
            />
           
          </div>

       


          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Meta og url
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="tel"
              id="comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder={("Meta og url")}
            />
           
          </div>



          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Meta og image (link to src)
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder={("Meta og image (link to src)")}
            />
           
          </div>



          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Meta facebook id
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="tel"
              id="comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder={("Meta facebook id")}
            />
           
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Meta site name
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder={("Meta site name")}
            />
           
          </div>


          <div className="flex flex-col gap-2">
            <Label htmlFor="comment">
            Meta post twitter
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="comment"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              placeholder={("Meta post twitter")}
            />
           
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

export default CategoriesAdd;