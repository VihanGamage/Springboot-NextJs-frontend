"use client"

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { toast } from "sonner";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Paginations } from "./Paginations";
import { format } from "date-fns";

const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

interface DataProps{
    id:number;
    userName:string;
    productName:string;
    quantity:number;
    total:number;
    orderStatus:string;
    placed_at:string;
}

async function updateOrderStatus(id:number, orderStatus:string) {
    const res = await fetch(`${api}/order/patch-${id}-${orderStatus}`,{
            method:'PATCH',
    });
    if (!res.ok){
        throw new Error("failed")
    }else {
        toast.success("Updated Successfully")
    }
}


export default function AdminOrderManageTable(){

    const [data, setData] = useState<DataProps[]>([])
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const getUserData = useCallback(async () => {
        try{
            const res = await axios.get(`${api}/order/admin-orders?page=${currentPage}&size=8`)
            setData(res.data.content);
            setTotalPages(res.data.totalPages);
        }catch (error){
            console.error("Error fetching paginated data:", error);
        } 
    },[currentPage]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);


    const handleOrderStatus = async (id:number, value:string) => {
        try{
            await updateOrderStatus(id, value);
            await getUserData();
        }catch(error){
            toast.error("Failed to update status");
        }
    }
    
    return(
        <>
            <Table className="w-2/3 ml-auto mr-auto mt-8">
            <TableHeader className="bg-gray-500">
                <TableRow>
                    <TableHead className="font-bold text-center text-base">ID</TableHead>
                    <TableHead className="font-bold text-center text-base">User</TableHead>
                    <TableHead className="font-bold text-center text-base">product Name</TableHead>
                    <TableHead className="font-bold text-center text-base">Quantity</TableHead>
                    <TableHead className="font-bold text-center text-base">Price</TableHead>
                    <TableHead className="font-bold text-center text-base">order Status</TableHead>
                    <TableHead className="font-bold text-center text-base">placed Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((user:DataProps) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-normal text-center">{user.id}</TableCell>
                        <TableCell className="font-normal text-center">{user.userName}</TableCell>
                        <TableCell className="font-medium text-center">{user.productName}</TableCell>
                        <TableCell className="font-medium text-center">{user.quantity}</TableCell>
                        <TableCell className="font-medium text-center">{user.total}</TableCell>
                        
                        <TableCell className="font-medium text-center align-middle">
                            <Select
                                onValueChange={(value) => handleOrderStatus(user.id, value)}>
                                <SelectTrigger className="w-[240px] mx-auto">
                                    <SelectValue placeholder={user.orderStatus}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDING">PENDING</SelectItem>
                                    <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                                    <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                        
                        <TableCell className="font-medium text-center">
                            {format(new Date(user.placed_at), "PPp")}
                        </TableCell>


                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Paginations
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
        </>
    )
}