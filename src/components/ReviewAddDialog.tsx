"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ReviewAddForm from "./ReviewAddForm";
import React from "react"

type EditReviewAddDialogProps = {
    productName: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    onUpdate: () => void;
}

export default function ReviewAddDialog({ productName, open, setOpen, onUpdate }: EditReviewAddDialogProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Review</DialogTitle>
                </DialogHeader>

                <ReviewAddForm productName={productName} onClose={() => {
                    onUpdate();
                    setOpen(false)
                }} />

                <DialogClose asChild>
                    <Button variant="outline" className="mt-4">Close</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}
