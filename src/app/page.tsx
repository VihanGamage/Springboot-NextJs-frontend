"use client"

import Login from "@/app/login/page";
import Register from "@/app/register/page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";

export default function Home() {

  const [login, setLogin] = useState(true);

  return (
    <>
      <div className="flex items-center justify-center mx-auto w-fit space-x-2 mt-12">
        <Image src="/logo-image.png" width="40" height="15" alt={"logo"} />
        <Label className="text-4xl font-medium">Welcome to the Store App</Label>
      </div>

      {login && <Login />}
      {!login && <Register />}

      {login && (
        <div className="w-80 mx-auto mt-8 flex flex-col items-center space-y-4">
          <Label>Not a User? Register now</Label>
          <Button className="cursor-pointer" onClick={() => setLogin(false)}>
            Register
          </Button>
        </div>
      )}
    </>
  );
}
