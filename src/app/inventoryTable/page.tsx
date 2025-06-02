"use client";
import {Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import React, {useCallback, useEffect, useState} from "react";
import { toast } from "sonner"
import {Button} from "@/components/ui/button";
import { Paginations } from "@/components/Paginations";
import axios from "axios";
import InventoryDialog from "@/components/InventoryDialog";

interface Inventory{
    id:number,
    name:string,
    capacity:number
}

const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

async function deleteData(id:number) : Promise<void> {
    const res = await fetch(`${api}/inventory/delete-${id}`,{
        method:'DELETE',
    });
    if (!res.ok){
        throw new Error("failed")
    }else {
        toast.success("Deleted Successfully")
    }
}


function InventoryTable() {
    const [data, setData] = useState<Inventory[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

      
      const fetchPaginatedData = useCallback(async () => {
        try {
          const res = await axios.get(`${api}/inventory/all?page=${currentPage}&size=8`);
          setData(res.data.content);
          setTotalPages(res.data.totalPages);
        } catch (error) {
          console.error("Error fetching paginated data:", error);
        }
      },[currentPage]);

    useEffect(() => {
        fetchPaginatedData();
    }, [fetchPaginatedData]);
      

    const handleEdit = (id:number) => {
        setEditingId(id);
        setDialogOpen(true);
    };

    return (
        <div>
        <Table className="w-2/3 ml-auto mr-auto mt-4">
            <TableHeader className="bg-slate-200">
                <TableRow>
                    <TableHead className="font-bold text-center text-base">ID</TableHead>
                    <TableHead className="font-bold text-center text-base">Name</TableHead>
                    <TableHead className="font-bold text-center text-base">Capacity</TableHead>
                    <TableHead className="font-bold text-center text-base">Edit</TableHead>
                    <TableHead className="font-bold text-center text-base">Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((user:Inventory) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-normal text-center">{user.id}</TableCell>
                        <TableCell className="font-medium text-center">{user.name}</TableCell>
                        <TableCell className="font-medium text-center">{user.capacity}</TableCell>
                        <TableCell className="font-medium text-center">
                            <Button
                                className="cursor-pointer"
                                onClick={() => handleEdit(user.id)}
                            >
                                Edit
                            </Button>
                        </TableCell>
                        <TableCell className="font-medium text-center">
                            <Button
                            className="cursor-pointer" 
                            variant={"destructive"}
                            onClick={async () => {
                                try{
                                    await deleteData(user.id);
                                    fetchPaginatedData();
                                }catch (error){
                                    console.error(error);
                                    toast("Failed to delete");
                                }
                            }}
                            >
                                Delete
                            </Button>
                        </TableCell>

                    </TableRow>
                ))}
                
                
            </TableBody>
        </Table>
        <Paginations
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />

            {editingId !== null &&(
                <InventoryDialog
                    id={editingId}
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    onUpdate={fetchPaginatedData}
                />
            )}

        </div>
    )
}
export default InventoryTable