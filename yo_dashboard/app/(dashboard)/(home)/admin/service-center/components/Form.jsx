"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

const SeviceCenter = () => {


  return (
    <>
      <form >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 relative">
          <Label htmlFor="sub1" className="mb-3">
        Choose Brand
      </Label>
          <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">English</SelectItem>
        <SelectItem value="mathmatics">Mathmatics</SelectItem>
        <SelectItem value="physics">Physics</SelectItem>
        <SelectItem value="chemistry">Chemistry</SelectItem>
        <SelectItem value="biology">Biology</SelectItem>
      </SelectContent>
    </Select>
           
          </div>
          <div className="flex flex-col gap-2 relative">
          <Label htmlFor="sub1" className="mb-3">
        Choose Area
      </Label> 
           <Select>
       <SelectTrigger>
         <SelectValue placeholder="Select a subject" />
       </SelectTrigger>
       <SelectContent>
         <SelectItem value="english">English</SelectItem>
         <SelectItem value="mathmatics">Mathmatics</SelectItem>
         <SelectItem value="physics">Physics</SelectItem>
         <SelectItem value="chemistry">Chemistry</SelectItem>
         <SelectItem value="biology">Biology</SelectItem>
       </SelectContent>
     </Select>
            
           </div>
 
        </div>

     
         <div
          style={{ margin: "auto", width: "300px", gap: "20px" }}
          className="mt-5 flex justify-center"
        >
          <Button style={{ margin: "auto" }} className="mx-5" type="submit">
            {("Reset")}
          </Button>

          <Button style={{ margin: "auto" }} className="mx-5" type="submit">
            {("Submit")}
          </Button>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default SeviceCenter;
