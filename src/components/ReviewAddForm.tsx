"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import React from "react";
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

const FormSchema = z.object({
    review: z.string().min(1,"Review is required"),
})

type FormValues = z.infer<typeof FormSchema>

interface UpdateFormProps {
    productName: string;
    onClose: () => void;
}

export default function ReviewAddForm({productName, onClose} : UpdateFormProps) {

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            review: "",
        },
    })

    async function onSubmit(data : FormValues) {
        console.log(data)
        const res = await fetch(`${api}/review/save-${productName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                review: data.review
            }),
        });
        if (!res.ok) {
            console.log(`Not valid URL! \nStatus: ${res.status}, ${res.statusText}`)
        } else {
            console.log("Success")
            toast("Review Added")
            onClose();
        }
    }

    return (
        <div className="border border-gray-400 rounded-lg p-2 ml-1 mt-5 flex w-2/3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <FormField
                        control={form.control}
                        name="review"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Review</FormLabel>
                                <FormControl>
                                    <Input placeholder="Review" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button className="ml-2" type="submit">Submit</Button>
                </form>
            </Form>
        </div>

    )
}
