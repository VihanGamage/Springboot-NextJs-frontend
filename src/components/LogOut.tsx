"use client";

import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

export default function LogOut(){

    const router = useRouter();
    const pathname = usePathname();

    if (pathname === "/login" || pathname === "/register" || pathname === "/") {
      return null;
    }   
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    }

    return (
      <div className="absolute top-0 right-12 m-4">
        <Button variant={"destructive"} onClick={handleLogout}>
          Log out
        </Button>
      </div>
    );
}