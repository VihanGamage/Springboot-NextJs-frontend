"use client";
import {Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import React, {useCallback, useEffect, useState} from "react";
import { toast } from "sonner"
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Paginations } from "@/components/Paginations";
import axios from "axios";
import ProductDialog from "@/components/ProductDialog";

interface Product{
    id:number,
    name:string,
    price:number
}

const api = process.env.NEXT_PUBLIC_API_URL ?? "https://ecommerce-store-vihan-bkeqaqfhc2czd7gy.southindia-01.azurewebsites.net";

async function deleteData(id:number) : Promise<void> {
    const res = await fetch(`${api}/product/delete-${id}`,{
        method:'DELETE',
    });
    if (!res.ok){
        throw new Error("failed")
    }else {
        toast.success("Deleted Successfully")
    }
}

async function saveProduct(product: {name:string; price:number} ) : Promise<void>{
    const res = await fetch(`${api}/product/save`,{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    if (!res.ok) {
        toast.error("Failed to add product");
    }else{
        toast.success("Product added")
    }
}

function ProductTable() {
    const [data, setData] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState({name:"",price:0});
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [dialogOpen, setDialogOpen] =useState(false);

      
      const fetchPaginatedData = useCallback(async () => {
        try {
          const res = await axios.get(`${api}/product/all?page=${currentPage}&size=8`);
          setData(res.data.content);
          setTotalPages(res.data.totalPages);
        } catch (error) {
          console.error("Error fetching paginated data:", error);
        }
      },[currentPage]);

    useEffect(() => {
        fetchPaginatedData();
    }, [fetchPaginatedData]);
      

    const handleAdd = async () => {
        if(!newProduct.name || newProduct.price==0){
            toast("Please fill all fields correctly");
            return;
        }
        try{
            await saveProduct(newProduct);
            setNewProduct({ name: "", price: 0 }); // reset form
            await fetchPaginatedData();
        }catch(error){
            console.error(error);
        }
    };

    const handleEdit = (id: number) => {
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
                    <TableHead className="font-bold text-center text-base">Price</TableHead>
                    <TableHead className="font-bold text-center text-base">Edit</TableHead>
                    <TableHead className="font-bold text-center text-base">Delete</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((user:Product) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-normal text-center">{user.id}</TableCell>
                        <TableCell className="font-medium text-center">{user.name}</TableCell>
                        <TableCell className="font-medium text-center">{user.price}</TableCell>
                        
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
                                    await fetchPaginatedData();
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
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                    </TableCell>
                    <TableCell className="text-center">
                        <Input
                            className="mx-auto w-40"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
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

            {editingId !== null && (
                <ProductDialog
                    id={editingId}
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    onUpdate={fetchPaginatedData}
                />
            )}

        </div>
    )
}
export default ProductTable