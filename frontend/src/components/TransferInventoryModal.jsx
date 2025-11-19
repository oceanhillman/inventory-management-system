import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const TransferInventoryModal = ({ open, setOpen, onSubmit, sourceWarehouse, warehouses, inventory }) => {

    const [quantity, setQuantity] = useState(1);
    const [destination, setDestination] = useState(null);
    // const [storageLocation, setStorageLocation] = useState("");

    const handleSubmit = () => {
        const body = {
            productId: inventory.productId,
            quantity: Number(quantity),
            // storageLocation: String(storageLocation)
        }
        onSubmit(sourceWarehouse.id, destination.id, body);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-neutral-800 text-neutral-50 border-neutral-500" onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
                <DialogTitle>Transfer Inventory</DialogTitle>
                <div>
                    <p>Source warehouse: {sourceWarehouse.name}</p>
                    {inventory && (
                        <>
                            <p>Product: {inventory.productName}</p>
                            <p>Quantity available: {inventory.quantity}</p>
                        </>
                    )}
                </div>

            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                <Label htmlFor="name">Product Quantity</Label>
                <Input id="name" name="name" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="border-neutral-500"/>
                {/* <Label htmlFor="name">Storage Location</Label>
                <Input id="name" name="name" placeholder="Location" value={storageLocation} onChange={(e) => setStorageLocation(e.target.value)}/> */}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} className="cursor-pointer">
                        <Input type="text" value={destination ? destination.name : "Select Destination Warehouse"} 
                            className="cursor-pointer hover:bg-neutral-700 border-neutral-500"
                        />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="text-neutral-100 bg-neutral-700 w-full">
                        {warehouses.filter((warehouse) => {
                            return warehouse != sourceWarehouse;
                        })
                        .map((warehouse) => {
                            return(
                                <DropdownMenuItem 
                                    key={warehouse.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDestination(warehouse)
                                    }
                                }
                                className="cursor-pointer hover:bg-neutral-600"
                                >
                                {warehouse.name}
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuContent>
            
                </DropdownMenu>
            </div>

            <DialogFooter>
                <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">Cancel</Button>
                </DialogClose>
                <Button 
                onClick={() => handleSubmit()} 
                className="bg-neutral-50 text-black cursor-pointer">
                Transfer Inventory
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TransferInventoryModal;