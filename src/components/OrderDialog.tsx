"use client"

import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import React from "react";
import {Button} from "@/components/ui/button";
import OrderForm from "./OrderForm";

type OrderDialogProps = {
    productName:string;
    quantity:number;
    open : boolean;
    setOpen : (open:boolean) => void;
}

export default function InventoryDialog({productName,quantity,open,setOpen}:OrderDialogProps){

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>

                <OrderForm productName={productName} quantity={quantity} onClose={() => {
                    setOpen(false)
                }}/>

                <DialogClose asChild>
                    <Button variant="outline" className="mt-4">Close</Button>
                </DialogClose>
            </DialogContent>

        </Dialog>
    )
}