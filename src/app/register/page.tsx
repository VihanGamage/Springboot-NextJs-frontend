"use client";

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

const api =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

const FormSchema = z.object({
  userName: z.string().min(1, "userName is required"),
  password: z.string().min(1, "password is required"),
});

type FormValues = z.infer<typeof FormSchema>;

export default function Register() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  async function onSubmit(data: FormValues) {
    const res = await fetch(`${api}/auth/register`, {
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
      toast.error("register failed");
    } else {
      toast.success("register Successful");
      router.push("/login");
    }
  }

  return (
    <>
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
              Register
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
