"use client"

import OrderDialog from "@/components/OrderDialog"
import { Paginations } from "@/components/Paginations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import axios from "axios"
import { useCallback, useEffect, useState } from "react";

interface DataProps{
    productName:string;
    price:number;
}

const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

export default function Order(){

    const [data,setData] = useState<DataProps[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [quantity,setQuantity] = useState<{[productName:string]:string}>({});
    const [productName, setProductName] = useState("");
    const [orderDialogOpen, setOrderDialogOpen] = useState(false);

    const fetchPaginatedData = useCallback(async () => {
        try {
          const res = await axios.get(`${api}/order/table?page=${currentPage}&size=8`);
          setData(res.data.content);
          setTotalPages(res.data.totalPages);
        } catch (error) {
          console.error("Error fetching paginated data:", error);
        }
      },[currentPage]);

    useEffect(() => {
        fetchPaginatedData();
    }, [fetchPaginatedData]);


    
    const quantityHandler = (quantity:string,productName:string) => {
        const onlyNumbers = quantity.replace(/[^0-9]/g, "");
        setQuantity({[productName]:onlyNumbers});
        setProductName(productName);
    }

    return(
        <>
            <Table className="w-2/3 ml-auto mr-auto mt-4">
            <TableHeader className="bg-gray-500">
                <TableRow>
                    <TableHead className="font-bold text-center text-base">Product Name</TableHead>
                    <TableHead className="font-bold text-center text-base">Price</TableHead>
                    <TableHead className="font-bold text-center text-base">Quantity</TableHead>
                    <TableHead className="font-bold text-center text-base">Buy</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((user:DataProps) => (
                    <TableRow key={user.productName}>
                        <TableCell className="font-medium text-center">{user.productName}</TableCell>
                        <TableCell className="font-medium text-center">{user.price}</TableCell>
                        <TableCell className="font-medium text-center align-middle">
                            <Input 
                            className="w-24 mx-auto"
                            type="text"
                            placeholder="0"
                            value={quantity[user.productName] || ""}
                            onChange={(e) => quantityHandler((e.target.value),user.productName)}
                            />
                        </TableCell>
                        <TableCell className="font-medium text-center">
                            <Button
                                className="cursor-pointer"
                                onClick={() => {
                                    setOrderDialogOpen(true)
                                }}
                                >
                                Buy
                            </Button>
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


        {orderDialogOpen && (
            <OrderDialog
                productName={productName}
                quantity={Number(quantity[productName])}
                open={orderDialogOpen}
                setOpen={setOrderDialogOpen}
            />
        )}         
        

        </>
    )
}