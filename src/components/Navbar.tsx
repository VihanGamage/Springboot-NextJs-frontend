import React from "react";
import Link from "next/link";
import {Menubar, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar"

const Navbar = () => {
    return (
        <div className="flex justify-center items-center w-full mt-8">
            {/* <Image src={Photo} width="auto" height={50} alt={"logo"}/> */}
            <Menubar className="">
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

               
            </Menubar>
        </div>
    );
};

export default Navbar;