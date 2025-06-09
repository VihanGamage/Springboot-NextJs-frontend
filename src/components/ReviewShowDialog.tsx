"use client"

import {Dialog,DialogClose,DialogContent,DialogHeader,DialogTitle} from "@/components/ui/dialog"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";

const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

type DialogProps = {
    showProductName: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

type DataProps = {
    review:string;
}


export default function ReviewShowDialog({showProductName,open,setOpen} : DialogProps){
    
    const [data,setData] = useState<DataProps[]>([])

    const getData = async () => {
        try {
          const res = await axios.get(`${api}/review/getall-${showProductName}`);
          setData(res.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    useEffect(() => {
        getData();
    }, [showProductName]);


    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
                <DialogTitle className="text-center">
                    {showProductName} Reviews
                </DialogTitle>
            </DialogHeader>

            <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2">
                {data.length === 0 ? 
                (<p>No Reviews found</p>) 
                : 
                (data.map((review, index) => (
                    <div key={index} className="rounded-md p-3 bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
                        {review.review}
                    </div>
                )))
                }
                
            </div>

            <DialogClose asChild>
                    <Button variant="outline" className="mt-4">Close</Button>
            </DialogClose>
        </DialogContent>
        </Dialog>
    )
}