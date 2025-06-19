"use client"

import Login from "@/app/login/page";
import Register from "@/app/register/page";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Home() {

  const [login, setLogin] = useState(true);

  return (
    <>
      {login && <Login />}
      {!login && <Register />}

      {login && (
        <div className="w-80 mx-auto mt-16 flex flex-col items-center space-y-4">
          <Label>Not a User? Register now</Label>
          <Button
            className="cursor-pointer"
            onClick={ () => setLogin(false)}
          >
            Register
          </Button>
        </div>
      )}
    </>
  );
}
