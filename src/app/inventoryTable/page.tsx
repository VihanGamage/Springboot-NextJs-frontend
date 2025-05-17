"use client";
import {Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import React, {useEffect, useState} from "react";
import { toast } from "sonner"
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Paginations } from "@/components/Paginations";
import axios from "axios";
import InventoryDialog from "@/components/InventoryDialog";

interface Inventory{
    id:number,
    name:string,
    capacity:number
}

const api = process.env.NEXT_PUBLIC_AZURE_URL

async function deleteData(id:number) : Promise<void> {
    const res = await fetch(`https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net/inventory/delete-${id}`,{
        method:'DELETE',
    });
    if (!res.ok){
        throw new Error("failed")
    }else {
        toast.success("Deleted Successfully")
    }
}

async function saveInventory(inventory: {name:string; capacity:number} ) : Promise<void>{
    const res = await fetch(`https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net/inventory/save`,{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inventory),
    });
    if (!res.ok) {
        toast.error("Failed to add inventory");
        throw new Error("Save failed");
    }
    toast.success("Inventory added");
}

function InventoryTable() {
    const [data, setData] = useState<Inventory[]>([]);
    const [newInventory, setNewInventory] = useState({name:"",capacity:0});
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);


      
      const fetchPaginatedData = async () => {
        try {
          const res = await axios.get(`https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net/inventory/all?page=${currentPage}&size=8`);
          setData(res.data.content);
          setTotalPages(res.data.totalPages);
        } catch (error) {
          console.error("Error fetching paginated data:", error);
        }
      };

    useEffect(() => {
        fetchPaginatedData();
    }, [fetchPaginatedData]);
      

    const handleAdd = async () => {
        if(newInventory.name=="" || newInventory.capacity==0){
            toast("Please fill all fields correctly");
            return;
        }
        try{
            await saveInventory(newInventory);
            setNewInventory({ name: "", capacity: 0 }); // reset form
            await fetchPaginatedData();
        }catch(error){
            console.error(error);
        }
    };

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
                {/* new row */}
                <TableRow>
                    <TableCell className="text-center"></TableCell>
                    <TableCell className="text-center">
                        <Input
                            className="mx-auto w-40"
                            placeholder="Name"
                            value={newInventory.name}
                            onChange={(e) => setNewInventory({ ...newInventory, name: (e.target.value) })}
                        />
                    </TableCell>
                    <TableCell className="text-center">
                        <Input
                            className="mx-auto w-40"
                            placeholder="Price"
                            value={newInventory.capacity}
                            onChange={(e) => setNewInventory({ ...newInventory, capacity: Number(e.target.value) })}
                        />
                    </TableCell>
                    <TableCell className="text-center" colSpan={2}>
                        <Button onClick={handleAdd} className="w-60 cursor-pointer">
                            Add
                        </Button>
                    </TableCell>
                </TableRow>
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
                />
            )}

        </div>
    )
}
export default InventoryTable