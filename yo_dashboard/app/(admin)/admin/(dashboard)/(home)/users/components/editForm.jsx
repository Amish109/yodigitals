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

const EditUser = () => {
  const params = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    role: "",
    password: "",
    aadharNumber: "",
    panNumber: "",
  });


  const fetchCategoryData = async () => {
    const id = params?.id;
    if (!id) return;

    try {
      const apiResData = await getApiData(`users/${id}`);

      if (apiResData) {
        setFirstName(apiResData?.user?.firstName);
        setLastName(apiResData?.user?.lastName); 
        setPhoneNumber(apiResData?.user?.phoneNumber);
        setEmail(apiResData?.user?.email);
        setPanNumber(apiResData?.user?.pan_number);
        setPassword(apiResData?.user?.password);
        setAadharNumber(apiResData?.user?.aadhar_number);
        setRole(apiResData?.user?.role);
      } else {
        toast.error("Failed to fetch user data");
      } 
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = params?.id;

    const apiData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      role,
      password,
      aadhar_number: aadharNumber,
      pan_number: panNumber,
    };

    try {
      const data = await updateApiData(`users/${id}`, apiData, "application/json");
      if (data.success) {
        toast.success("User updated successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        // resetForm();
      } else {
        toast.error(data.error || "Error updating user", {
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
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setRole("");
    setPassword("");
    setAadharNumber("");
    setPanNumber("");
    setErrors({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      role: "",
      password: "",
      aadharNumber: "",
      panNumber: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              size="lg"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              size="lg"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="tel"
              size="lg"
              id="phoneNumber"
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              id="email"
              size="lg"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter E-mail"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="aadharNumber">Aadhar Number</Label>
            <Input
              type="text"
              id="aadharNumber"
              required
              size="lg"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              placeholder="Enter Aadhar Number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="panNumber">PAN Number</Label>
            <Input
              type="text"
              id="panNumber"
              size="lg"
              required
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
              placeholder="Enter PAN Number"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              size="lg"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Select user role</Label>
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="users">User</SelectItem>
                <SelectItem value="retailers">Retailer</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
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

export default EditUser;