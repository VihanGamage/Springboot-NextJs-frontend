"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

const FormSchema = z.object({
  userName: z.string().min(1, "userName is required"),
  password: z.string().min(1, "password is required"),
});

type FormValues = z.infer<typeof FormSchema>

export default function Login(){

    const router = useRouter();

    const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        userName: "",
        password: "",
      },
    });

    async function onSubmit(data : FormValues) {
            const res = await fetch(`${api}/auth/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userName: data.userName,
                password: data.password,
              }),
            });
            if (!res.ok) {
                toast.error("Login failed");
            } else {
                
              const result = await res.json(); 
              if (result.token) {
                toast.success("Login Successful");
                localStorage.setItem("token", result.token); //save jwt
                router.push("/productTable");
              } else {
                toast.error("Invalid Creditianls");
              }
            }
        }

    return (
      <>
        <div className="flex items-center justify-center mx-auto w-fit space-x-2 mt-12">
          <Image src="/logo-image.png" width="40" height="15" alt={"logo"} />
          <Label className="text-4xl font-medium">
            Welcome to the Store App
          </Label>
        </div>
        <div className="border border-gray-400 rounded-lg p-6 mt-20 w-80 mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 flex flex-col items-center"
            >
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder="User Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="cursor-pointer" type="submit">
                Login
              </Button>
            </form>
          </Form>
        </div>
      </>
    );
}