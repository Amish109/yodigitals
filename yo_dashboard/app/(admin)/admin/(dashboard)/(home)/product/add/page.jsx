"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DueForm from "../components/form";

const AddProduct = () => {




  return (

    <Card>
      <CardHeader>
        <CardTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Add Product
            <div className=" w-100 flex justify-between gap-5">

              <div>
                <Button color="primary" >
                <Link href="/admin/product/list" prefetch={true}>{("Products List")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-4 space-y-4 gap-2 lg:space-y-0 lg:grid lg:grid-cols-1 gap-6 mx-auto ">

          <div className="col-span-2 mb-5">

            <DueForm />

          </div>
        </div>
      </CardContent>
    </Card >

  );
};

export default AddProduct;