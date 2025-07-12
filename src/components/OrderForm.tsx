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
    name: z.string().min(1,"name is required"),
    address: z.string().min(1,"address is required")
})

type FormValues = z.infer<typeof FormSchema>

interface UpdateFormProps {
    productName:string;
    quantity:number;
    onClose: () => void;
}

export default function OrderForm({productName,quantity,onClose} : UpdateFormProps) {

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            address: ""
        },
    })

    async function onSubmit(data : FormValues) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${api}/order/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: data.name,
            address: data.address,
            quantity: quantity,
            productName: productName,
          }),
        });
        if (!res.ok) {
            console.log(`Not valid URL! \nStatus: ${res.status}, ${res.statusText}`)
        } else {
            toast("Order Added")
            onClose();
        }
    }

    return (
        <div className="border border-gray-400 rounded-lg p-2 ml-1 mt-5 flex w-2/3">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Address" {...field} />
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
