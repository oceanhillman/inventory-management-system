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

import { getProductById } from '@/lib/api'

const ProductDetailsModal = ({ open, setOpen, selectedInventory }) => {

    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (selectedInventory?.productId) {
            getProductById(selectedInventory?.productId)
            .then((response) => {
                setProduct(response);
            });
        };
        
    }, [selectedInventory]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-neutral-800 text-neutral-50" onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
                <DialogTitle>Product Details</DialogTitle>
                <div>
                    {product && (
                        <>
                            <p>SKU: {product.sku}</p>
                            <p>Name: {product.name}</p>
                            <p>Description: {product.description}</p>
                            <p>Category: {product.category}</p>
                            <p>Price: {product.price}</p>
                        </>
                    )}
                </div>

            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">Close</Button>
                </DialogClose>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsModal;