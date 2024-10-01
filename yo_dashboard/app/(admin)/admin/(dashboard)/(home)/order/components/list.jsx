"use client";
import * as React from "react";
import {
  flexRender, 
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";


import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteApiData, getApiData, postApiData } from "@/helper/common";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";


export function BasicDataTable() {


  const [isOpen1, setIsOpen1] = React.useState(false);
  const [view, setView] = useState("")

 
  const handleClose1 = () => {
    setIsOpen1(false);
  }; 

  const ViewConfirm = async (id) => {
   
    setIsOpen1(true);

    try {
      const apiResData = await getApiData(`orders/${id}`);
console.log(apiResData,"bbssbbbbbbbbbbbbbbbbbbbbbbbbbb");

      if (apiResData) {
        setView(apiResData?.order)
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error("Error fetching user data");
    }
  };

  const [id, setId] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchProductenqList = async () => {
    try {
      const apiResData = await getApiData(`orders`);
      
      if (apiResData.success === true) {
        setData(apiResData?.orders);
      } else {
        setData([]);
        setError(apiResData.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    fetchProductenqList();
  }, []);

  const productEnqDelete = async () => {
    toast.dismiss();
    try {
      const response = await deleteApiData(`orders/${id}`);
      if (response.success == true) {
        toast.success(response.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        await fetchProductenqList(); 
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Error deleting product enquiry");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const DeleteConfirm = (id) => {
    setId(id);
    setIsOpen(true);
  };

  const columns = [
    {
      accessorKey: "sn",
      header: "S NO",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.index + 1}</div>
      ),
    },

    {
      accessorKey: "OrderDate",
      header: "Order Date",
      cell: ({ row }) => {
        const order_date = new Date(row.original.order_date);
        return (
          <div className="whitespace-nowrap">
            {order_date.toLocaleDateString()}
          </div>
        );
      },
    },
    {
      accessorKey: "DeliveryDate",
      header: "Delivery Date",
      cell: ({ row }) => {
        const delivery_date = new Date(row.original.delivery_date);
        return (
          <div className="whitespace-nowrap">
            {delivery_date.toLocaleDateString()}
          </div>
        );
      },
    },
    // {
    //   accessorKey: "Order Time",
    //   header: "Order Time",
    //   cell: ({ row }) => {
    //     const createdAt = new Date(row.original.createdAt);
    //     return (
    //       <div className="whitespace-nowrap">
    //         {createdAt.toLocaleTimeString()}
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">₹ {row?.original?.amount}</div>
      ),
    },

   
    {
      accessorKey: "tracking_number ",
      header: "Tracking Number",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.original?.tracking_number}</div>
      ),
    },

    {
        accessorKey: "Status",
        header: "Order Status",
        cell: ({ row }) => (
          <Badge
            variant="soft"
            color={
              row?.original?.status === "inprocess"
                ? "info"
                : row?.original?.status === "dispatched"
                ? "success"
                : row?.original?.status === "intransit"
                ? "success"

                 : row?.original?.status === "delivered"
                ? "success"

                 : row?.original?.status === "pending"
                ? "secondary"

                  : row?.original?.status === "completed"
                ? "secondary"

                   : row?.original?.status === "cancelled"
                ? "destructive"

                  : row?.original?.status === "rejected"
                ? "destructive"

                : "destructive"
            }
            className="capitalize"
          >
            {row?.original?.status}
          </Badge>
        ),
      },
      {
        accessorKey: "Status",
        header: "Payment Status",
        cell: ({ row }) => (
          <Badge
            variant="soft"
            color={
              row?.original?.payment_status === "pending"
                ? "info"
                : row?.original?.payment_status === "paid"
                ? "success"
               
               

                  : row?.original?.payment_status === "failed"
                ? "destructive"

                : "destructive"
            }
            className="capitalize"
          >
            {row?.original?.payment_status}
          </Badge>
        ),
      },
   

    
    {
      accessorKey: "action",
      header: "Action",
      headerProps: { className: "text-center" },
      cell: ({ row }) => (
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Link  href={`/admin/businessinfo/edit/${row?.original?.id}`}>
        <Button
          size="icon"
          variant="outline"
          color="secondary"
          className=" h-7 w-7 "
        >
          <Icon icon="heroicons:pencil" className=" h-4 w-4  " />
        </Button> 
        </Link>
        <Button
        onClick={() => ViewConfirm(row.original.id)}
          size="icon"
          variant="outline"
          className=" h-7 w-7 text-green-700"
          color="secondary"
        >
          
          <Icon icon="heroicons:eye" className=" h-4 w-4  " />
        </Button>
        
       
        <Button
         onClick={() => DeleteConfirm(row.original.id)}
          size="icon"
          variant="outline"
          className=" h-7 w-7  text-red-700"
          color="secondary"
        >
          <Icon icon="heroicons:trash" className=" h-4 w-4  " />
        </Button>
      </div>
      ),
    },
  ];
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div>
      <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {"No results"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center flex-wrap gap-4 px-4 py-4">
        <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} {("rows selected")}
        </div>

        <div className="flex gap-2  items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8"
          >
            <Icon icon="heroicons:chevron-left" className="w-5 h-5" />
          </Button>

          {table.getPageOptions().map((page, pageIdx) => (
            <Button
              key={`basic-data-table-${pageIdx}`}
              onClick={() => table.setPageIndex(pageIdx)}
              variant={`${pageIdx === table.getState().pagination.pageIndex
                  ? ""
                  : "outline"
                }`}
              className={cn("w-8 h-8")}
            >
              {page + 1}
            </Button>
          ))}

          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Icon icon="heroicons:chevron-right" className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div>
        <Dialog open={isOpen} onOpenChange={handleClose}>
          {" "}
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-base font-medium ">
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontSize: "18px",
                  }}
                >
                  {" "}
                  Order Delete Confirm
                </p>
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center text-center">
              <span className="text-sm text-default-500  mt-1 block"></span>
              <p
                style={{
                  fontSize: "16px",
                  textAlign: "justify",
                   lineHeight: "30px",
                  width: "100%",
                }}
                width={"100%;"}
               >
             Are you sure you want to delete this order?
              </p>
            </div>
            <DialogFooter className="mt-8 gap-2">
              <DialogClose asChild>
                <Button onClick={handleClose} type="button" variant="outline">
                  {("Cencel")}
                </Button>
              </DialogClose>
              {/* <Link href="/admin/kyc-update" > */}
              <Button onClick={() => productEnqDelete()} type="button">
              Delete Confirm
              </Button>
              {/* </Link> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
{/* view model */}

<div className="flex flex-wrap  gap-x-5 gap-y-4 ">
    <Dialog open={isOpen1} onOpenChange={handleClose1}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent size="3xl">
        <DialogHeader>
          <DialogTitle className="text-base font-medium text-default-700 ">
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-default-500  space-y-4">
        <form>
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    
    <div className="flex flex-col gap-2">
      <Label htmlFor="id">Order ID</Label>
      <Input
        type="text"
        id="id"
        size="lg"
        value={view?.id}
        disabled="true"
        placeholder="Order ID"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="order_date">Order Date</Label>
      <Input
        type="text"
        id="order_date"
        size="lg"
        value={view?.order_date ? new Date(view.order_date).toLocaleDateString() : ''}
        disabled="true"
        placeholder="Order Date"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="amount">Amount</Label>
      <Input
        type="text"
        id="amount"
        size="lg"
        value={view?.amount}
        disabled="true"
        placeholder="Amount"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="status">Order Status</Label>
      <Input
        type="text"
        id="status"
        size="lg"
        value={view?.status}
        disabled="true"
        placeholder="Order Status"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="payment_status">Payment Status</Label>
      <Input
        type="text"
        id="payment_status"
        size="lg"
        value={view?.payment_status}
        disabled="true"
        placeholder="Payment Status"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="coupon_code">Coupon Code</Label>
      <Input
        type="text"
        id="coupon_code"
        size="lg"
        value={view?.coupon_code}
        disabled="true"
        placeholder="Coupon Code"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="overall_distributor_price">Distributor Price</Label>
      <Input
        type="text"
        id="overall_distributor_price"
        size="lg"
        value={view?.overall_distributor_price}
        disabled="true"
        placeholder="Distributor Price"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="shipping_method">Shipping Method</Label>
      <Input
        type="text"
        id="shipping_method"
        size="lg"
        value={view?.shipping_method}
        disabled="true"
        placeholder="Shipping Method"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="payment_method">Payment Method</Label>
      <Input
        type="text"
        id="payment_method"
        size="lg"
        value={view?.payment_method}
        disabled="true"
        placeholder="Payment Method"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="customer_note">Customer Note</Label>
      <Input
        type="text"
        id="customer_note"
        size="lg"
        value={view?.customer_note}
        disabled="true"
        placeholder="Customer Note"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="currency">Currency</Label>
      <Input
        type="text"
        id="currency"
        size="lg"
        value={view?.currency}
        disabled="true"
        placeholder="Currency"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="discount_amount">Discount Amount</Label>
      <Input
        type="text"
        id="discount_amount"
        size="lg"
        value={view?.discount_amount}
        disabled="true"
        placeholder="Discount Amount"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="tax_amount">Tax Amount</Label>
      <Input
        type="text"
        id="tax_amount"
        size="lg"
        value={view?.tax_amount}
        disabled="true"
        placeholder="Tax Amount"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="shipping_address">Shipping Address</Label>
      <Input
        type="text"
        id="shipping_address"
        size="lg"
        value={view?.shipping_address}
        disabled="true"
        placeholder="Shipping Address"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="billing_address">Billing Address</Label>
      <Input
        type="text"
        id="billing_address"
        size="lg"
        value={view?.billing_address}
        disabled="true"
        placeholder="Billing Address"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="order_type">Order Type</Label>
      <Input
        type="text"
        id="order_type"
        size="lg"
        value={view?.order_type}
        disabled="true"
        placeholder="Order Type"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="delivery_date">Delivery Date</Label>
      <Input
        type="text"
        id="delivery_date"
        size="lg"
        value={view?.delivery_date ? new Date(view.delivery_date).toLocaleDateString() : ''}
        disabled="true"
        placeholder="Delivery Date"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="tracking_number">Tracking Number</Label>
      <Input
        type="text"
        id="tracking_number"
        size="lg"
        value={view?.tracking_number}
        disabled="true"
        placeholder="Tracking Number"
      />
    </div>

    <div className="flex flex-col gap-2">
      <Label htmlFor="order_source">Order Source</Label>
      <Input
        type="text"
        id="order_source"
        size="lg"
        value={view?.order_source}
        disabled="true"
        placeholder="Order Source"
      />
    </div>

  </div>
</form>

        </div>
        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button type="submit" variant="outline">
              Cencel
            </Button>
          </DialogClose>
        
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
    </>
  );
}

export default BasicDataTable;