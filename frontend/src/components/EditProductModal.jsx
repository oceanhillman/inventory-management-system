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

const EditProductModal = ({ open, setOpen, onSubmit, product }) => {

    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (product) {
            setSku(product.sku || "");
            setName(product.name || "");
            setDescription(product.description || "");
            setCategory(product.category || "");
            setPrice(product.price || "");
        }
    }, [product]);

    const submit = () => {
        const body = {
            sku: sku,
            name: name,
            description: description,
            category: category,
            price: Number(price)
        };
        console.log(body);
        onSubmit(product.id, body);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-neutral-800 text-neutral-50 border-neutral-500" onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
                <DialogTitle>Edit Product Details</DialogTitle>
                <DialogDescription>
                Make changes to product information using the following fields:
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" name="sku" placeholder="Product SKU" value={sku} onChange={(e) => setSku(e.target.value)} className="border-neutral-500"/>
                </div>
                <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} className="border-neutral-500"/>
                </div>
                <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" placeholder="Product description" value={description} onChange={(e) => setDescription(e.target.value)} className="border-neutral-500"/>
                </div>
                <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="border-neutral-500"/>
                </div>
                <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="border-neutral-500"/>
                </div> 
            </div>
            <DialogFooter>
                <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">Cancel</Button>
                </DialogClose>
                <Button 
                onClick={submit} 
                className="bg-neutral-50 text-black cursor-pointer">
                Save
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditProductModal;