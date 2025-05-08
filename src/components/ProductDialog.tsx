"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import UpdateFormProduct from "@/components/UpdateFormProduct";
import React from "react"

type EditProductDialogProps = {
    id: number;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function ProductDialog({ id, open, setOpen }: EditProductDialogProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>

                <UpdateFormProduct id={id} onClose={() => setOpen(false)} />

                <DialogClose asChild>
                    <Button variant="outline" className="mt-4">Close</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}
