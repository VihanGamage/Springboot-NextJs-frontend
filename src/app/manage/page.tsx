"use client"

import AdminOrderManageTable from "@/components/AdminOrderManageTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import UserOrderManageTable from "@/components/UserOrderManageTable";
import axios from "axios";
import { useEffect, useState } from "react"

//const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

export default function Manage(){

    const [admin, setAdmin] = useState(false);
    const [userTable, setUserTable] = useState(false);
    const [user,setUser] = useState("");

    
    return(
        <>
        <div className="flex justify-end">
            <div className="flex items-center space-x-2 mr-32 mt-8">
                <Switch 
                    id="admin" 
                    checked={admin}
                    onCheckedChange={setAdmin}
                />
                <Label>Admin</Label>
            </div>
        </div>

        <Label className="ml-64 mb-4">
            Enter your name to see the orders
        </Label>

        <div className="flex w-full items-center gap-2">
            <Input
                className="w-60 ml-64"
                placeholder="Your Name"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />
            <Button 
                type="submit" 
                variant="outline"
                onClick={(e) => setUserTable(true)}
            >
                Enter
            </Button>
        </div>

        <div>
            {admin ?
                (<AdminOrderManageTable/>) 
            :   (
                    (userTable ? 
                        (<UserOrderManageTable name={user}/>)
                    :
                        (<></>)
                    )
                )
            }
        </div>

        </>
    )
}

