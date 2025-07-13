"use client"

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { format } from "date-fns";

const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

interface DataProps {
  id: number;
  productName: string;
  quantity: number;
  address: string;
  total: number;
  orderStatus: string;
  placed_at: string;
}


async function cancelOrder(id:number) : Promise<void>{
    const token = localStorage.getItem("token");
    const res = await fetch(`${api}/order/cancel-${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok){
        throw new Error("failed")
    }else {
        toast.success("Canceled Order")
    }
}


export default function UserOrderManageTable(){

    const [data, setData] = useState<DataProps[]>([])

    const getUserData = useCallback(async () => {
        try{
            const token = localStorage.getItem("token");
            const res = await axios.get(`${api}/order/user-orders`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setData(res.data);
        }catch (error){
            console.error("Error fetching data:", error);
        } 
    },[]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);
    
    return (
      <>
        <Table className="w-2/3 ml-auto mr-auto mt-4">
          <TableHeader className="bg-gray-500">
            <TableRow>
              <TableHead className="font-bold text-center text-base">
                ID
              </TableHead>
              <TableHead className="font-bold text-center text-base">
                product Name
              </TableHead>
              <TableHead className="font-bold text-center text-base">
                Quantity
              </TableHead>
              <TableHead className="font-bold text-center text-base">
                Price
              </TableHead>
              <TableHead className="font-bold text-center text-base">
                Address
              </TableHead>
              <TableHead className="font-bold text-center text-base">
                order Status
              </TableHead>
              <TableHead className="font-bold text-center text-base">
                placed Time
              </TableHead>
              <TableHead className="font-bold text-center text-base">
                Cancel
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((user: DataProps) => (
              <TableRow key={user.id}>
                <TableCell className="font-normal text-center">
                  {user.id}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {user.productName}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {user.quantity}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {user.total}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {user.address}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {user.orderStatus}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {format(new Date(user.placed_at), "PPp")}
                </TableCell>

                <TableCell className="font-medium text-center">
                  <Button
                    className="cursor-pointer"
                    variant={"destructive"}
                    onClick={async () => {
                      try {
                        await cancelOrder(user.id);
                        await getUserData();
                      } catch (error) {
                        console.error(error);
                        toast("Failed to cancel order");
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
}