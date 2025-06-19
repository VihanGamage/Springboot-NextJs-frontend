"use client";

import {Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import React, {useCallback, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import { Paginations } from "@/components/Paginations";
import axios from "axios";
import ReviewAddDialog from "@/components/ReviewAddDialog";
import ReviewShowDialog from "@/components/ReviewShowDialog";
import Navbar from "@/components/Navbar";

interface ReviewProps{
    productName:string,
    reviewCount:number
}

const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

function Reviews(){

    const [data, setData] = useState<ReviewProps[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [productName, setProductName] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] =useState(false);
    const [showDialogOpen, setShowDialogOpen] = useState(false);
    const [showProductName, setShowProductName] = useState("");
      
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


    
    const openReviewDialog = (productName: string) => {
        setProductName(productName);
        setDialogOpen(true);
    };

    const openShowReview = (showProductName: string) => {
        setShowProductName(showProductName);
        setShowDialogOpen(true);
    }

    return (
      <div>
        <Navbar />
        <Table className="w-2/3 ml-auto mr-auto mt-4">
          <TableHeader className="bg-gray-500">
            <TableRow>
              <TableHead className="font-bold text-center text-base">
                Product Name
              </TableHead>
              <TableHead className="font-bold text-center text-base">
                Reviews
              </TableHead>
              <TableHead className="font-bold text-center text-base">
                Show Reviews
              </TableHead>
              <TableHead className="font-bold text-center text-base">
                Add Review
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user: ReviewProps) => (
              <TableRow key={user.productName}>
                <TableCell className="font-medium text-center">
                  {user.productName}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {user.reviewCount}
                </TableCell>
                <TableCell className="font-medium text-center">
                  <Button
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => openShowReview(user.productName)}
                  >
                    Show
                  </Button>
                </TableCell>
                <TableCell className="font-medium text-center">
                  <Button
                    className="cursor-pointer"
                    onClick={() => openReviewDialog(user.productName)}
                  >
                    Add
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

        {productName !== null && (
          <ReviewAddDialog
            productName={productName}
            open={dialogOpen}
            setOpen={setDialogOpen}
            onUpdate={fetchPaginatedData}
          />
        )}

        {showDialogOpen && (
          <ReviewShowDialog
            showProductName={showProductName}
            open={showDialogOpen}
            setOpen={setShowDialogOpen}
          />
        )}
      </div>
    );
}
export default Reviews