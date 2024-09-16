"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { FileUploader } from "react-drag-drop-files";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postApiData } from "@/helper/common";

const ProductAdd = () => {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const [amount, setAmount] = useState("");
  const [transRef, setTransRef] = useState("");
  const [discount, setDiscount] = useState("");
  const [categories, setCategories] = useState("");
  const [moreProducts, setMoreProducts] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [stock, setStock] = useState("");
  const [distributorPrice, setDistributorPrice] = useState("");
  const [description, setDescription] = useState("");
  const [screenShotImg, setScreenShotImg] = useState(null);

  const handleImageChange = (image) => {
    setScreenShotImg(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiData = new FormData();
    apiData.append("title", transRef);
    apiData.append("price", amount);
    apiData.append("discount", discount);
    apiData.append("categories", categories);
    apiData.append("moreProducts", moreProducts);
    apiData.append("metaDescription", metaDescription);
    apiData.append("keywords", keywords);
    apiData.append("stock", stock);
    apiData.append("distributorPrice", distributorPrice);
    apiData.append("description", description);
    if (screenShotImg) {
      apiData.append("image", screenShotImg);
    }

    try {
      const data = await postApiData("product", apiData);

      if (data.success) {
        toast.success("Product added successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        // Clear the form after successful submission
        setTransRef("");
        setAmount("");
        setDiscount("");
        setCategories("");
        setMoreProducts("");
        setMetaDescription("");
        setKeywords("");
        setStock("");
        setDistributorPrice("");
        setDescription("");
        setScreenShotImg(null);
      } else {
        toast.error(data.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (error) {
      toast.error(error.message, {
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
            <Label htmlFor="title">
              Title
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              size="lg"
              id="title"
              required
              value={transRef}
              onChange={(e) => setTransRef(e.target.value)}
              placeholder="Title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="price">
              Price
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              size="lg"
              id="price"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Price"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="discount">
              Discount
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="discount"
              size="lg"
              required
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="categories">
              Categories
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="categories"
              size="lg"
              required
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              placeholder="Categories"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="moreProducts">
              More products
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="moreProducts"
              size="lg"
              value={moreProducts}
              onChange={(e) => setMoreProducts(e.target.value)}
              placeholder="More products"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="metaDescription">
              Meta description
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="metaDescription"
              size="lg"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Meta description"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="keywords">
              Keywords (comma separated values e.g. new,cool,fancy)
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="keywords"
              size="lg"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Keywords"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="stock">
              Stock
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="stock"
              size="lg"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="distributorPrice">
              Distributor Price
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Input
              type="text"
              id="distributorPrice"
              size="lg"
              value={distributorPrice}
              onChange={(e) => setDistributorPrice(e.target.value)}
              placeholder="Distributor Price"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          <div className="flex flex-col gap-2 mt-5">
            <Label htmlFor="description">
              Description
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Type Here.."
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 mb-5">
            <Label>
              Upload Image
              <span style={{ color: "tomato" }}>*</span>
            </Label>
            <FileUploader
              handleChange={handleImageChange}
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
                alt="Uploaded preview"
              />
            )}
          </div>
        </div>

        <div
          style={{ margin: "auto", width: "100%", gap: "20px" }}
          className="mt-5 flex justify-center"
        >
          <Button style={{ margin: "auto" }} className="mx-5" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProductAdd;
