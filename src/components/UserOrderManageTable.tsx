"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { toast } from "sonner";

const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

interface DataProps{
    id:number;
    productName:string;
    quantity:number;
    total:number;
    order_status:string;
    placed_at:string;
}

interface Props{
    name:string;
}

async function deleteData(id:number) : Promise<void>{
    const res = await fetch(`${api}/order/delete-${id}`,{
            method:'DELETE',
    });
    if (!res.ok){
        throw new Error("failed")
    }else {
        toast.success("Deleted Successfully")
    }
}


export default function UserOrderManageTable( {name} : Props ){

    const [data, setData] = useState<DataProps[]>([])

    const getUserData = async () => {
        try{
            const res = await axios.get(`${api}/order/user-${name}`)
            setData(res.data);
        }catch (error){
            console.error("Error fetching data:", error);
        } 
    }

    useEffect(() => {
        getUserData();
    }, [getUserData]);
    
    return(
        <>
            <Table className="w-2/3 ml-auto mr-auto mt-4">
            <TableHeader className="bg-gray-500">
                <TableRow>
                    <TableHead className="font-bold text-center text-base">ID</TableHead>
                    <TableHead className="font-bold text-center text-base">product Name</TableHead>
                    <TableHead className="font-bold text-center text-base">Quantity</TableHead>
                    <TableHead className="font-bold text-center text-base">Price</TableHead>
                    <TableHead className="font-bold text-center text-base">order Status</TableHead>
                    <TableHead className="font-bold text-center text-base">placed Time</TableHead>
                    <TableHead className="font-bold text-center text-base">Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((user:DataProps) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-normal text-center">{user.id}</TableCell>
                        <TableCell className="font-medium text-center">{user.productName}</TableCell>
                        <TableCell className="font-medium text-center">{user.quantity}</TableCell>
                        <TableCell className="font-medium text-center">{user.total}</TableCell>
                        <TableCell className="font-medium text-center">{user.order_status}</TableCell>
                        <TableCell className="font-medium text-center">{user.placed_at}</TableCell>

                        <TableCell className="font-medium text-center">
                            <Button 
                            className="cursor-pointer"
                            variant={"destructive"}
                            onClick={async () => {
                                try{
                                    await deleteData(user.id);
                                    await getUserData();
                                }catch (error){
                                    console.error(error);
                                    toast("Failed to delete");
                                }
                            }}
                            >
                                Delete
                            </Button>
                        </TableCell>


                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    )
}