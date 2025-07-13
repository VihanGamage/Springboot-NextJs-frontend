"use client"

import AdminOrderManageTable from "@/components/AdminOrderManageTable";
import Navbar from "@/components/Navbar";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import UserOrderManageTable from "@/components/UserOrderManageTable";
import { useState } from "react"

export default function Manage(){

    const [admin, setAdmin] = useState(false);
    
    return (
      <>
        <Navbar />
        <div className="flex justify-end">
          <div className="flex items-center space-x-2 mr-32 mt-8">
            <Switch
              id="admin"
              checked={admin}
              onCheckedChange={(checked) => {
                setAdmin(checked);
              }}
            />
            <Label>Admin</Label>
          </div>
        </div>

        <div>
          {admin && <AdminOrderManageTable />}
          {!admin && <UserOrderManageTable/>}
        </div>
      </>
    );
}

