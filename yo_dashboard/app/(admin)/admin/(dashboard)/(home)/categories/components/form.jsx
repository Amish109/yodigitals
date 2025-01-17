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
import { postApiData } from "@/helper/common";

const CategoriesAdd = () => {

  

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [top_category, setTopCategory] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    slug: "",
    top_category: "",
  });

  const validateFields = () => {
    let tempErrors = { ...errors };
    let isValid = true;

    if (!name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    } else {
      tempErrors.name = "";
    }

    if (!slug.trim()) {
      tempErrors.slug = "Slug is required";
      isValid = false;
    } else {
      tempErrors.slug = "";
    }

    if (top_category === "") {
      tempErrors.top_category = "Top Category is required";
      isValid = false;
    } else {
      tempErrors.top_category = "";
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const apiData = {
      name: name,
      slug: slug,
      top_category: top_category,
    };

    try {
      const data = await postApiData("categories", apiData, "application/json");
      if (data.success === true) {
        toast.success("Category added successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        resetForm();
      } else {
        toast.error(data.error, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (errorData) {
      toast.error(errorData.error, {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };

  const resetForm = () => {
    setName("");
    setSlug("");
    setTopCategory("");
    setErrors({
      name: "",
      slug: "",
      top_category: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
               size="lg"

              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              type="text"
              size="lg"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Enter Slug"
            />
            {errors.slug && <span style={{ color: "red" }}>{errors.slug}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="top_category">Top Category</Label>
            <Select
              value={top_category}
              onValueChange={(value) => setTopCategory(value)}
            >
              <SelectTrigger>
              <SelectValue>
           {top_category ? top_category?.title : "Top Category"}
         </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
            {errors.top_category && <span style={{ color: "red" }}>{errors.top_category}</span>}
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

export default CategoriesAdd;
