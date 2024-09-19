"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { getApiData, updateApiData } from "@/helper/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";

const UpdateBusinessInfo = () => {
  const { id } = useParams(); // Extract 'id' directly
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [cin, setCin] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10)); // Set default to today's date
  const [turnover, setTurnover] = useState("");
  const [user_id, setUser_id] = useState("");
  const [data, setData] = useState([]);

  // Fetch business data to auto-populate fields
  const fetchBusinessData = async () => {
    if (!id) return;

    try {
      const apiResData = await getApiData(`business/${id}`);
      if (apiResData?.businessInfo) {
        setDueDate(apiResData?.businessInfo?.due_date.toISOString || new Date().toISOString().slice(0, 10)); 
        setBusinessName(apiResData.businessInfo.business_name || "");
        setBusinessAddress(apiResData.businessInfo.business_address || "");
        setGstNumber(apiResData.businessInfo.gst_number || "");
        setCin(apiResData.businessInfo.cin || "");
        setTurnover(apiResData.businessInfo.turnover || "");
        setUser_id(apiResData?.businessInfo?.user_id);
       
      } else {
        toast.error("Failed to fetch business data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error("Error fetching business data");
    }
  };

  // Fetch the user list to populate the retailer dropdown
  const FetchUserList = async () => {
    try {
      const apiResData = await getApiData(`users`);
      if (apiResData.success === true) {
        const retailers = apiResData?.users?.filter((user) => user.role === 'retailers');
        setData(retailers);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchBusinessData();
    FetchUserList();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiData = {
      business_name: businessName,
      business_address: businessAddress,
      gst_number: gstNumber,
      cin,
      due_date: dueDate,
      turnover,
      user_id,
    };

    try {
      const response = await updateApiData(`business/${id}`, apiData, "application/json");
      if (response.success === true) {
        toast.success("Business Info updated successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      } else {
        toast.error(response.error || "Error updating business info", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (error) {
      toast.error("Error submitting the form", {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };

  const resetForm = () => {
    setBusinessName("");
    setBusinessAddress("");
    setGstNumber("");
    setCin("");
    setDueDate(new Date().toISOString().slice(0, 10)); 
    setTurnover("");
    setUser_id("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              type="text"
              id="businessName"
              size="lg"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter Business Name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="businessAddress">Business Address</Label>
            <Input
              type="text"
              id="businessAddress"
              size="lg"
              required
              value={businessAddress}
              onChange={(e) => setBusinessAddress(e.target.value)}
              placeholder="Enter Business Address"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="gstNumber">GST Number</Label>
            <Input
              type="text"
              id="gstNumber"
              size="lg"
              required
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              placeholder="Enter GST Number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cin">CIN</Label>
            <Input
              type="text"
              id="cin"
              size="lg"
              required
              value={cin}
              onChange={(e) => setCin(e.target.value)}
              placeholder="Enter CIN"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              type="date"
              id="dueDate"
              size="lg"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="turnover">Turnover</Label>
            <Input
              type="number"
              id="turnover"
              size="lg"
              required
              value={turnover}
              onChange={(e) => setTurnover(e.target.value)}
              placeholder="Enter Turnover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="user_id">Select Retailer</Label>
            <Select
              value={user_id}
              onValueChange={(value) => setUser_id(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose Retailer" />
              </SelectTrigger>
              <SelectContent>
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.firstName} {item.lastName} {/* Display retailer's name */}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled>No Retailers Available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-5 flex justify-center gap-5">
          <Button type="button" onClick={resetForm}>
            Reset
          </Button>

          <Button type="submit">Submit</Button>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default UpdateBusinessInfo;
