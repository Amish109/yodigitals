"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileUploader } from "react-drag-drop-files";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";
import { getApiData, postApiFormData, updateApiData } from "@/helper/common";
import { useParams } from "next/navigation";

const EditProducts = () => {
  const fileTypes = ["JPG", "PNG", "GIF"];
  const initialErrors = {
    title: "",
    description: "",
    images: "",
    price: "",
  };

  // State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState("");
  const [brand, setBrand] = useState("");
  const [errors, setErrors] = useState(initialErrors);
  const [data, setData] = useState([]);
  const [bdata, setBData] = useState([]);
const params = useParams()

  

const fetchProductData = async () => {
    const id = params?.id;
    if (!id) return;

    try {
      const apiResData = await getApiData(`product/${id}`);
      console.log(apiResData);
      if (apiResData) {
        setTitle(apiResData?.title);
        setDescription(apiResData?.description); 
        setPrice(apiResData?.price); 
        setStock(apiResData?.stock); 
        setImages(apiResData?.images); 
        setStatus(apiResData?.status); 
        setBrand(apiResData?.brand); 
        setCategories(apiResData?.categories); 
     
      
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initialErrors);

    // const apiData = new FormData();
    // apiData.append("title", title);
    // apiData.append("description", description);
    // apiData.append("images", images); 
    // apiData.append("price", price);
    // apiData.append("stock", stock);
    // apiData.append("status", status);
    // apiData.append("categories", categories);
    // apiData.append("brand", brand);

    const apiData = {
        title,
        description,
        images,
        price,
        stock,
        status,
        categories,
        brand,
      };
  

    try {
      const data = await updateApiData(`product/${params.id}`, apiData);
      if (data.success === true) {
        toast.success("Product update successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
       
      }
    } catch (errorData) {
      console.log("error");
      
    }
  };

  // Reset form fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImages(null);
    setPrice("");
    setStock("");
    setStatus("");
    setCategories("");
    setBrand("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Title" required>
            <Input
              type="text"
              value={title}
               size="lg"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            {errors.title && <ErrorMessage message={errors.title} />}
          </FormField>

          <FormField label="Description" required>
            <Input
              type="text"
              value={description}
              size="lg"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
            {errors.description && <ErrorMessage message={errors.description} />}
          </FormField>

          <FormField label="Price">
            <Input
              type="text"
              value={price}
               size="lg"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
            {errors.price && <ErrorMessage message={errors.price} />}
          </FormField>

          <FormField label="Stock">
            <Input
              type="text"
              value={stock}
               size="lg"
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
            />
            {errors.stock && <ErrorMessage message={errors.stock} />}
          </FormField>

          <FormField label="Status">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>

                <SelectValue>
           {status ? status?.title : "Select Status"}
         </SelectValue>

              </SelectTrigger>
              <SelectContent>
                <SelectItem value="out of stock">Out of stock</SelectItem>
                <SelectItem value="in stock">In stock</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Select Categories">
            <Select value={categories} onValueChange={setCategories}>
              <SelectTrigger>
                <SelectValue>
           {categories ? categories?.title : "Choose Categories"}
         </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {data.length > 0 ? (
                  data.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled>No Categories Available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Select Brand">
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger>
                <SelectValue>
           {brand ? brand?.title : "Choose Brand"}
         </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {bdata.length > 0 ? (
                  bdata.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled>No Brands Available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </FormField>

          <div className="flex flex-col gap-3 mb-5">
            <Label>
              Upload Images<span style={{ color: "tomato" }}>*</span>
            </Label>
            <FileUploader
              handleChange={setImages}
              name="images"
              types={fileTypes}
            />
            {errors.images && <ErrorMessage message={errors.images} />}
            {images && (
              <img
                src={images}
                width="100px"
                style={{ borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", border: "1px solid #ccc" }}
              />
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-5">
          <Button type="button" onClick={resetForm}>Reset</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  );
};

const FormField = ({ label, required, children }) => (
  <div className="flex flex-col gap-2">
    <Label>
      {label}
      {required && <span style={{ color: "tomato" }}>*</span>}
    </Label>
    {children}
  </div>
);

const ErrorMessage = ({ message }) => (
  <span style={{ color: "red" }}>{message}</span>
);

export default EditProducts;