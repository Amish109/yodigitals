"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApiData, updateApiData } from "@/helper/common";
import { useParams } from "next/navigation";

const CategoriesEdit = () => {
  const params = useParams(); // Getting the params
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [top_category, setTopCategory] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    slug: "",
    top_category: "",
  });

  const fetchCategoryData = async () => {
    const id = params?.id;
    if (!id) return;

    try {
      const apiResData = await getApiData(`categories/${id}`);
      if (apiResData.success) {
        setName(apiResData?.category?.name);
        setSlug(apiResData?.category?.slug);
        setTopCategory(apiResData?.category?.top_category ? "true" : "false");
      } else {
        toast.error("Failed to fetch category data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error("Error fetching category data");
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

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
    if (!validateFields()) return;

    const id = params?.id;
    if (!id) return;

    const apiData = {
      name,
      slug,
      top_category: top_category === "true", // Convert to boolean for the backend
    };

    try {
      const data = await updateApiData(`categories/${id}`, apiData);
      if (data.success) {
        toast.success("Category updated successfully", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      } else {
        toast.error(data.error || "Failed to update category", {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error updating category", {
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
                <SelectValue placeholder="Choose Option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
            {errors.top_category && (
              <span style={{ color: "red" }}>{errors.top_category}</span>
            )}
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

export default CategoriesEdit;
