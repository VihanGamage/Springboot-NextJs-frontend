"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import React, {useCallback, useEffect} from "react";
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

const FormSchema = z.object({
    name: z.string().min(1,"Name is required"),
    price: z.string().regex(/^[1-9][0-9]*$/, "Price must be a number")
})

type FormValues = z.infer<typeof FormSchema>

interface UpdateFormProps {
    id: number;
    onClose: () => void;
}

async function getFormData(id: number): Promise<{ name: string; price: number }> {
    const res = await fetch(`${api}/product/get-${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }
    return res.json();
}


export default function UpdateFormProduct({id, onClose} : UpdateFormProps) {

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            price: ""
        },
    })

    const { setValue } = form;

    const loadData = useCallback(async () => {
        try {
            const data = await getFormData(id);
            setValue("name", data.name);
            setValue("price", data.price.toString()); // convert number to string for input
        } catch (error) {
            toast.error("Failed to load product data");
            console.error(error);
        }
    }, [id,setValue]);

    useEffect(() => {
        loadData();
    }, [loadData]);


    async function onSubmit(data : FormValues) {
        console.log(data)
        const res = await fetch(`${api}/product/put-${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                price: data.price
            }),
        });
        if (!res.ok) {
            console.log(`Not valid URL! \nStatus: ${res.status}, ${res.statusText}`)
        } else {
            console.log("Success")
            toast("Configured Successfully")
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
                        name="price"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="Price" {...field} />
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
