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

const CreateWarehouseModal = ({ open, setOpen, onSubmit }) => {

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState("");

    const submit = () => {
        const body = {
            name: name,
            location: location,
            capacity: Number(capacity)
        };
        console.log(body);
        onSubmit(body);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-neutral-800 text-neutral-50" onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
                <DialogTitle>Create Warehouse</DialogTitle>
                <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
                <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Warehouse name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="grid gap-3">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="Warehouse location" value={location} onChange={(e) => setLocation(e.target.value)}/>
                </div>
                <div className="grid gap-3">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" name="capacity" placeholder="Max capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)}/>
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

export default CreateWarehouseModal;