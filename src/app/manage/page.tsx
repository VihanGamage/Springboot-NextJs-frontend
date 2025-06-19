"use client"

import AdminOrderManageTable from "@/components/AdminOrderManageTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import UserOrderManageTable from "@/components/UserOrderManageTable";
import { useState } from "react"

export default function Manage(){

    const [admin, setAdmin] = useState(false);
    const [user,setUser] = useState("");

    
    return (
      <>
        <div className="flex justify-end">
          <div className="flex items-center space-x-2 mr-32 mt-8">
            <Switch id="admin" 
            checked={admin} 
            onCheckedChange={(checked) => {
              setAdmin(checked);
              setUser("");
            }} 
            />
            <Label>Admin</Label>
          </div>
        </div>

        { !admin &&
        <div>
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
           
          </div>
        </div> }

        <div>
          {admin && <AdminOrderManageTable/>}
          {!admin && user && <UserOrderManageTable name={user}/>}
        </div>
      </>
    );
}

