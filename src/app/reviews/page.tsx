"use client";

import {Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import React, {useCallback, useEffect, useState} from "react";
import { toast } from "sonner"
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Paginations } from "@/components/Paginations";
import axios from "axios";
import ProductDialog from "@/components/ProductDialog";

interface ReviewProps{
    id:number,
    name:string,
    reviews:number
}

const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";


function Reviews(){

    const [data, setData] = useState<ReviewProps[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
      
      const fetchPaginatedData = useCallback(async () => {
        try {
          const res = await axios.get(`${api}/review/all?page=${currentPage}&size=8`);
          setData(res.data.content);
          setTotalPages(res.data.totalPages);
        } catch (error) {
          console.error("Error fetching paginated data:", error);
        }
      },[currentPage]);

    useEffect(() => {
        fetchPaginatedData();
    }, [fetchPaginatedData]);

    return (
        <div>
        <Table className="w-2/3 ml-auto mr-auto mt-4">
            <TableHeader className="bg-slate-200">
                <TableRow>
                    <TableHead className="font-bold text-center text-base">ID</TableHead>
                    <TableHead className="font-bold text-center text-base">Name</TableHead>
                    <TableHead className="font-bold text-center text-base">Reviews</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((user:ReviewProps) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-normal text-center">{user.id}</TableCell>
                        <TableCell className="font-medium text-center">{user.name}</TableCell>
                        <TableCell className="font-medium text-center">{user.reviews}</TableCell>
                    </TableRow>
                ))}
                
            </TableBody>
        </Table>
        <Paginations
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />

        </div>
    )
}
export default Reviews