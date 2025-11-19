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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const TransferInventoryModal = ({ open, setOpen, onSubmit, sourceWarehouse, warehouses, inventory }) => {

    const [quantity, setQuantity] = useState(0);
    // const [storageLocation, setStorageLocation] = useState("");

    const handleSubmit = () => {
        const body = {
            productId: selectedProduct.id,
            warehouseId: warehouse.id,
            quantity: Number(quantity),
            // storageLocation: String(storageLocation)
        }
        onSubmit(body);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-neutral-800 text-neutral-50" onClick={(e) => e.stopPropagation()}>
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
                <Input id="name" name="name" placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                {/* <Label htmlFor="name">Storage Location</Label>
                <Input id="name" name="name" placeholder="Location" value={storageLocation} onChange={(e) => setStorageLocation(e.target.value)}/> */}
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">Cancel</Button>
                </DialogClose>
                <Button 
                onClick={() => handleSubmit()} 
                className="bg-neutral-50 text-black cursor-pointer">
                Create
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TransferInventoryModal;