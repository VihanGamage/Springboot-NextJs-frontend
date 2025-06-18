import React from "react";
import Link from "next/link";
import {Menubar, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar"
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="flex justify-center items-center w-full mt-8">
            <Image src="/logo-image.png" width="40" height="15" alt={"logo"}/>
            <Menubar className="ml-2">
                <MenubarMenu>
                    <MenubarTrigger>
                        <Link href={"/productTable"} className="text-2xl font-bold">
                            Product
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Link href={"/inventoryTable"} className="text-2xl font-bold">
                            Inventory
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Link href={"/reviews"} className="text-2xl font-bold">
                            Reviews
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Link href={"/order"} className="text-2xl font-bold">
                            Order
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>
                        <Link href={"/manage"} className="text-2xl font-bold">
                            Manage
                        </Link>
                    </MenubarTrigger>
                </MenubarMenu>

               
            </Menubar>
        </div>
    );
};

export default Navbar;