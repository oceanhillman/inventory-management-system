import { useState } from 'react'
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

const CreateProductModal = ({ open, setOpen, onSubmit }) => {

    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);

    const submit = () => {
        const body = {
            sku: sku,
            name: name,
            description: description,
            category: category,
            price: Number(price)
        };
        console.log(body);
        onSubmit(body);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-neutral-800 text-neutral-50" onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
                <DialogTitle>Create Product</DialogTitle>
                <DialogDescription>
                Add new product to database manually using the following fields:
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                <Label htmlFor="name">SKU</Label>
                <Input id="sku" name="sku" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)}/>
                </div>
                <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}/>
                </div>
                <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" placeholder="19.99" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">Cancel</Button>
                </DialogClose>
                <Button 
                onClick={submit} 
                className="bg-neutral-50 text-black cursor-pointer">
                Create
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateProductModal;