import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";

const DeleteWarehouseModal = ({ open, setOpen, warehouseName, onDelete}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-neutral-800 text-neutral-50 border-neutral-500" onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    Warehouse: {warehouseName} will be permanently deleted from the database.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">Cancel</Button>
                    </DialogClose>
                    <Button onClick={() => onDelete()} className="cursor-pointer bg-neutral-50 text-black">Confirm Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteWarehouseModal;