"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApiData, postApiData } from "@/helper/common";

const Form = () => {
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [contactNumber, setContactNumber] = useState("");
  const [gstin, setGstin] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [product, setProduct] = useState([null]);
  const [quantity, setQuantity] = useState([1]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [retailers, setRetailers] = useState([]);
  const [order_date, setOrder_date] = useState(new Date().toISOString().split("T")[0]);



  const fetchProductList = async () => {
    try {
      const apiResData = await getApiData(`product/list`);
      if (apiResData.success) {
        setData(apiResData?.products);
      } else {
        setData([]);
        setError(apiResData.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setError("Error fetching data");
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProduct([...product, null]);
    setQuantity([...quantity, 1]);
  };

  const handleRemoveProduct = (index) => {
    setProduct(product.filter((_, i) => i !== index));
    setQuantity(quantity.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, value) => {
    const updatedProduct = [...product];
    updatedProduct[index] = value;
    setProduct(updatedProduct);
  };

  const handleQuantityChange = (index, value) => {
    const updatedQuantity = [...quantity];
    updatedQuantity[index] = Math.max(1, value);
    setQuantity(updatedQuantity);
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();

    if ( product.includes(null)) {
      toast.error("Please fill in all required fields and select products.", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    try {
      toast.dismiss();

      // Constructing the order payload
      const status = "pending"
     
      const apiData = {
        retailerId: selectedRetailer,
        contactNumber,
        gstin,
        order_date,
        status,
        shippingAddress,
        products: product.map((id, index) => ({
          product_id: id,
          quantity: quantity[index],
        })),
      };

      const response = await postApiData("orders/create", apiData);

      // Handle the API response
      if (response.success) {
        toast.success("Order placed successfully!", {
          position: "bottom-center",
        });
        resetBtn(); // Reset form after successful submission
      } else {
        toast.error(response.message || "Failed to place order.", {
          position: "bottom-center",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while placing the order.", {
        position: "bottom-center",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  const resetBtn = () => {
    setProduct([null]);
    setQuantity([1]);
    setSelectedRetailer(null);
    setContactNumber("");
    setGstin("");
    setShippingAddress("");
  };

  const FetchUserList = async () => {
    try {
      const apiResData = await getApiData(`users`);
      if (apiResData.success) {
        const retailers = apiResData?.users?.filter((user) => user.role === "retailers");
        setRetailers(retailers);
      } else {
        setRetailers([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  const handleRetailerChange = (value) => {
    setSelectedRetailer(value);
    const retailer = retailers.find((r) => r.id === value);

    if (retailer) {
      const selectedBusinessInfo = retailer.businessInfo.length > 0 ? retailer.businessInfo[0] : null;

      setContactNumber(retailer.phoneNumber || "");
      setGstin(selectedBusinessInfo?.gst_number || "");
      setShippingAddress(selectedBusinessInfo?.business_address || "");
    } else {
      setContactNumber("");
      setGstin("");
      setShippingAddress("");
    }
  };

  useEffect(() => {
    FetchUserList();
    fetchProductList();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-11 mb-10">
        {/* Left side */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          <div className="w-full">
            <form onSubmit={handleOrderSubmit} className="max-w-lg mx-auto">
              <div className="space-y-4">
                <div className="md:w-1/3 w-full">
                  <Label htmlFor="order-date" className="text-default-600 mb-3 xl:text-lg text-xl">
                    {"Order Date:"}
                  </Label>
                  <Input placeholder={""} size="lg" id="order-date" type="date" value={order_date} onChange={(e)=>setOrder_date(e.target.value)} />
                </div>
              </div>
              {product.map((selectedProduct, index) => (
                <div key={index} className="flex">
                  <div className="w-full">
                    <Label className="mt-5" htmlFor={`product-${index}`}>
                      Select Product{" "}
                    </Label>
                    <div className="flex items-start mt-1">
                      <Select
                        value={selectedProduct || ""}
                        onValueChange={(value) => handleProductChange(index, value)}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {selectedProduct ? data.find((item) => item.id === selectedProduct)?.title : "Select a product"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {data.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex items-start ml-4">
                        <div className="flex items-center border-gray-100 mt-1 md:mx-5">
                          <span
                            onClick={() => handleQuantityChange(index, quantity[index] - 1)}
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3 duration-100 hover:bg-black hover:text-blue-50"
                          >
                            -{" "}
                          </span>
                          <input
                            className="h-7 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={quantity[index]}
                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                          />
                          <span
                            onClick={() => handleQuantityChange(index, quantity[index] + 1)}
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-black hover:text-blue-50"
                          >
                            +{" "}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveProduct(index)}
                        type="button"
                        className="ml-2 text-red-500 mt-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path
                            fill="red"
                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="parent-container mt-5 mr-24 mb-5 mx-10 flex justify-center sm:block">
                <div className="flex justify-center">
                  <Button onClick={handleAddProduct} className="bg-black" size="sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="white" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
                    </svg>
                    Add Product
                  </Button>
                </div>
              </div>

              <div   className="flex mt-20 gap-2">
          <button
            type="submit"
            className="text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-black"
          >
            Submit
          </button>

          <button
            type="reset"
            onClick={resetBtn}
            className="text-black bg-gray-200  focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-black"
          >
            Reset
          </button>

          <button
            type="button"
            className="text-black bg-gray-200  focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-black"
          >
            Cancel
          </button>
        </div>
            </form>
          </div>
        </div>
          {/* right side  */}
  <div className="lg:col-span-5 flex flex-col gap-5">
      {/* right side */}
      <div className="items-center w-full">
        <form>
          <Label htmlFor="name" className="text-default-600 mb-3 xl:text-lg text-xl">
            {"Retailer:"}
          </Label>
          <Select
            value={selectedRetailer || ""}
            onValueChange={handleRetailerChange}
          >
            <SelectTrigger>
              <SelectValue>
                {selectedRetailer
                  ? retailers.find((retailer) => retailer.id === selectedRetailer)?.firstName + " " +
                    retailers.find((retailer) => retailer.id === selectedRetailer)?.lastName
                  : "Choose Retailer"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {retailers.length > 0 ? (
                retailers.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.firstName} {item.lastName}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No Retailers Available</SelectItem>
              )}
            </SelectContent>
          </Select>

          <div className="flex flex-col mt-4 gap-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              type="text"
              size="lg"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Contact Number"
              required
            />
          </div>

          <div className="flex flex-col mt-4 gap-2">
            <Label htmlFor="gstin">GSTIN</Label>
            <Input
              type="text"
              size="lg"
              id="gstin"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              placeholder="GSTIN Number"
              required
            />
          </div>

          <div className="flex flex-col mt-4 gap-2">
            <Label htmlFor="shippingAddress">Shipping Address</Label>
            <Input
              type="text"
              size="lg"
              id="shippingAddress"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Shipping Address"
              required
            />
          </div>
        </form>
      </div>
    </div>
        
      </div>
      <Toaster />
    </>
  );
};

export default Form;
