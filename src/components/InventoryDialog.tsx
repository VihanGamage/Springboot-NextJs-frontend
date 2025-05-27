"use client"

import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import React from "react";
import {Button} from "@/components/ui/button";
import UpdateFormInventory from "@/components/UpdateFormInventory";

type EditInventoryDialogProps = {
    id : number;
    open : boolean;
    setOpen : (open:boolean) => void;
    onUpdate : () => void;
}

export default function InventoryDialog({id,open,setOpen,onUpdate}:EditInventoryDialogProps){

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Inventory</DialogTitle>
                </DialogHeader>

                <UpdateFormInventory id={id} onClose={() => {
                    onUpdate();
                    setOpen(false)
                }}/>

                <DialogClose asChild>
                    <Button variant="outline" className="mt-4">Close</Button>
                </DialogClose>
            </DialogContent>

        </Dialog>
    )
}