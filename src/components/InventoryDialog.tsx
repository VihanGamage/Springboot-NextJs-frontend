"use client"

type EditInventoryDialogProps = {
    id : number;
    open : boolean;
    setOpen : (open:boolean) => void;
}

export default function InventoryDialog({id,open,setOpen}:EditInventoryDialogProps){
    return(
        <div>
            hi
        </div>
    )
}