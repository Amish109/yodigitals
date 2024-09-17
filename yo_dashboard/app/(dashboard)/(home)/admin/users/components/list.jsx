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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ViewModel from '../components/ViewModel'

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import SegmentIcon from "@mui/icons-material/Segment";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";



import { deleteApiData, getApiData, postApiData } from "@/helper/common";

export function BasicDataTable() {

  const [id, setId] = React.useState(null);
  const [id1, setId1] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen1, setIsOpen1] = React.useState(false);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchProductList = async () => {
    try {
      const apiResData = await getApiData(`users`);
      if (apiResData.success === true) {
        setData(apiResData?.users);
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
    fetchProductList();
  }, []);

  const productsDelete = async () => {
    toast.dismiss();
    try {
      const response = await deleteApiData(`users/${id}`);
      if (response.success === true) {
        toast.success(response.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        await fetchProductList(); // Fetch updated product list
        setIsOpen(false); // Close the modal
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClose1 = () => {
    setIsOpen1(false);
  };

  const DeleteConfirm = (id) => {
    setId(id);
    setIsOpen(true);
  };
  const DeleteConfirm1 = (id) => {
    setId(id);
    setIsOpen1(true);
  };

  const columns = [
    {
      accessorKey: "sn",
      header: "S No",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.index + 1}</div>
      ),
    },
    {
      accessorKey: "Date",
      header: "Date",
      cell: ({ row }) => {
        const createdAt = new Date(row.original.createdAt);
        return (
          <div className="whitespace-nowrap">
            {createdAt.toLocaleDateString()}
          </div>
        );
      },
    },
    {
      accessorKey: "Time",
      header: "Time",
      cell: ({ row }) => {
        const createdAt = new Date(row.original.createdAt);
        return (
          <div className="whitespace-nowrap">
            {createdAt.toLocaleTimeString()}
          </div>
        );
      },
    },
    {
      accessorKey: "Name",
      header: "Full Name",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.firstName} {row.original.lastName}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.phoneNumber}</div>
      ),
    },

    {
      accessorKey: "email",
      header: "Email Address",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.email}</div>
      ),
    },

    // {
    //   accessorKey: "role",
    //   header: "Role",
    //   cell: ({ row }) => (
    //     <div className="whitespace-nowrap">{row.original.role}</div>
    //   ),
    // },

    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge
          variant="soft"
          color={
            row.original.role === "admin"
              ? "success"
              : row.original.role === "staff"
              ? "destructive"
              : row.original.role === "retailers"
              ? "warning"
              : "primary" // Default color for "users" and other roles
          }
          className="capitalize"
        >
          {row.original.role}
        </Badge>
      ),
    },
    
 
    {
      accessorKey: "action",
      header: "Action",
      headerProps: { className: "text-center" },
      cell: ({ row }) => (
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Link href={`/admin/users/edit/${row?.original?.id}`}>
          <Button
            size="icon"
            variant="outline"
            color="secondary"
            className="h-7 w-7"
          >
            <Icon icon="heroicons:pencil" className="h-4 w-4" />
          </Button>
          </Link>
         
          <Button
           onClick={() => DeleteConfirm1()}
            size="icon"
            variant="outline"
            color="secondary"
            className="h-7 w-7 text-green-700"
          >
            <Icon icon="heroicons:eye" className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => DeleteConfirm(row.original.id)}
            size="icon"
            variant="outline"
            color="secondary"
            className="h-7 w-7 text-red-700"
          >
            <Icon icon="heroicons:trash" className="h-4 w-4" />
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
                  User Delete Confirm
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
             Are you sure you want to delete this user?
              </p>
            </div>
            <DialogFooter className="mt-8 gap-2">
              <DialogClose asChild>
                <Button onClick={handleClose} type="button" variant="outline">
                  {("Cencel")}
                </Button>
              </DialogClose>
              {/* <Link href="/admin/kyc-update" > */}
              <Button onClick={() => productsDelete()} type="button">
              Delete Confirm
              </Button>
              {/* </Link> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap  gap-x-5 gap-y-4 ">
     
    
    
   
    
      <Dialog  open={isOpen1} onOpenChange={handleClose1} >
        <DialogTrigger asChild>
         
        </DialogTrigger>
        <DialogContent size="2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-medium text-default-700 ">
              What is the world's number one tourist destination?
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-default-500  space-y-4">
            <p>
              <span className="text-primary font-medium">France</span> is the
              most visited country in the world with 117,109,000 international
              tourists, thanks to its rich history and iconic landmarks.
            </p>
            <p>
              France's magnetic City of Light is a perennial tourist
              destination, drawing visitors with its iconic attractions, like
              the Eiffel Tower and the Louvre, and its unmistakable je ne sais
              quoi. Quaint cafes, trendy shopping districts and Haussmann
              architecture give Paris its timeless beauty. But the city's best
              asset is that you're likely to discover something new with each
              trip or season (read: Paris is always a good idea). To best
              explore France's ever-changing capital, get lost wandering the
              charming cobblestone streets, learn its secrets on a walking
              tour head to dynamic art exhibits like the Atelier des Lumières
              or gourmandize at the latest restaurants and pastry shops
            </p>
          </div>
          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button type="submit" variant="outline">
                Disagree
              </Button>
            </DialogClose>
            <Button type="submit">Agree</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
     
   
  
    </div>

    </>
  );
}

export default BasicDataTable;