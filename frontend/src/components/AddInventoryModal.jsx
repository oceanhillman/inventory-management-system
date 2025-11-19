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

const AddInventoryModal = ({ open, setOpen, onSubmit, warehouse, selectedProduct }) => {

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
            <DialogContent className="bg-neutral-800 text-neutral-50 border-neutral-500" onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
                <DialogTitle>Add Inventory</DialogTitle>
                <div>
                    <p>Adding to: {warehouse.name}</p>
                    {selectedProduct && (
                        <>
                            <p>SKU: {selectedProduct.sku}</p>
                            <p>Name: {selectedProduct.name}</p>
                            <p>Description: {selectedProduct.description}</p>
                            <p>Category: {selectedProduct.category}</p>
                            <p>Price: {selectedProduct.price}</p>
                        </>
                    )}
                </div>

            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                <Label htmlFor="name">Product Quantity</Label>
                <Input id="name" name="name" placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="border-neutral-500"/>
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
                Add Inventory
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddInventoryModal;