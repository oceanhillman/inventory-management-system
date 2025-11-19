import { useState, useEffect, useRef } from "react"
import isEqual from "lodash/isEqual"
import cloneDeep from "lodash/cloneDeep"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'

import ActionsMenu from "@/components/ActionsMenu"
import ProductDetailsModal from "@/components/ProductDetailsModal"
import DeleteInventoryModal from "@/components/DeleteInventoryModal"
import TransferInventoryModal from "@/components/TransferInventoryModal"


const InventoryTable = ({ warehouse, warehouses, onChangeView, onSaveChanges, handleDeleteInventory, handleTransferInventory }) => {

    const [inventory, setInventory] = useState(warehouse.inventory);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [detailsDialogIsOpen, setDetailsDialogIsOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [transferDialogIsOpen, setTransferDialogIsOpen] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState(null);

    const originalRef = useRef(cloneDeep(warehouse.inventory));

        const inventoryActions = [
        {title:"View product details", action: (inventory) => {
            setSelectedInventory(inventory);
            setDetailsDialogIsOpen(true);
        }},
        {title:"Transfer inventory", action: (inventory) => {
            setSelectedInventory(inventory);
            setTransferDialogIsOpen(true);
        }},
        {title:"Delete entry", action: (inventory) => {
            setSelectedInventory(inventory);
            setDeleteDialogIsOpen(true);
        }},
    ];


    const handleClickSave = () => {
        const changes = inventory.filter((item, index) => {
            return !isEqual(item, originalRef.current[index]);
        });
        
        onSaveChanges(changes);
    }

    const updateStorageLocation = (val, index) => {
        let items = cloneDeep(inventory);
        items[index].storageLocation = String(val);
        setInventory(items);
        setUnsavedChanges(true);
    }

    const updateQuantity = (val, index) => {
        let items = cloneDeep(inventory);
        items[index].quantity = Number(val);
        setInventory(items);
        setUnsavedChanges(true);
    }

    const incrementQuantity = (e, index) => {
        e.preventDefault();
        let items = cloneDeep(inventory);
        items[index].quantity = items[index].quantity + 1;
        setInventory(items);
        setUnsavedChanges(true);
    }

    const decrementQuantity = (e, index) => {
        e.preventDefault();
        let items = cloneDeep(inventory);
        items[index].quantity = items[index].quantity - 1;
        setInventory(items);
        setUnsavedChanges(true);
    }

    return (<>
        <div className="flex flex-col items-center justify-center p-4">
                <h1 className="text-neutral-50 text-2xl font-bold">Inventory</h1>
                <h2 className="text-neutral-500 text-xl font-bold">{warehouse.name}</h2>
        </div>
        <div className="flex flex-row justify-between p-4">
            <Button onClick={() => onChangeView('warehouses')} className="bg-neutral-100 cursor-pointer">
            Back to warehouses
            </Button>
            {unsavedChanges ? 
                <Button onClick={() => handleClickSave()} className="bg-neutral-100 cursor-pointer">
                Save changes
                </Button>
            : null}
            <Button onClick={() => onChangeView('products')} className="bg-neutral-100 cursor-pointer">
            Add new inventory
            </Button>
        </div>
        
        <Table className="bg-neutral-700 text-neutral-200 shadow">
        
            <TableHeader className="bg-neutral-800 text-neutral-100">
                <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-left">Storage Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody className="border-neutral-500">
                {inventory.map((row, index) => (
                <TableRow key={'w' + row.warehouseId + 'p' + row.productId} className="border-1 border-neutral-500">
                    <TableCell className="font-medium">{row.productName}</TableCell>
                    <TableCell className="text-center">
                        <span onMouseDown = {(e) => decrementQuantity(e, index)} className="cursor-pointer px-1">
                            -
                        </span>
                        <input
                        className="w-8 text-center text-neutral-50 placeholder-neutral-50 border-1 border-neutral-500 rounded"
                        type="text" 
                        value={inventory[index].quantity}
                        onChange={(e) => updateQuantity(e.target.value, index)}
                        />
                        <span onMouseDown = {(e) => incrementQuantity(e, index)} className="cursor-pointer px-1">
                            +
                        </span>
                    </TableCell>
                    <TableCell>
                        <input
                        className="border-1 border-neutral-500 rounded pl-1"
                        type="text"
                        value={inventory[index].storageLocation}
                        onChange={(e) => updateStorageLocation(e.target.value, index)}
                        >
                        </input>
                    </TableCell>
                    <TableCell className="text-right pr-5">
                        <ActionsMenu 
                            data={[row, row, row]}
                            actions={inventoryActions}
                        />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>

        <ProductDetailsModal
            open={detailsDialogIsOpen}
            setOpen={setDetailsDialogIsOpen}
            selectedInventory={selectedInventory}
        />
        <DeleteInventoryModal
            open={deleteDialogIsOpen}
            setOpen={setDeleteDialogIsOpen}
            onDelete={() => handleDeleteInventory(selectedInventory)}
        />
        <TransferInventoryModal
            open={transferDialogIsOpen}
            setOpen={setTransferDialogIsOpen}
            onSubmit={() => handleTransferInventory()}
            sourceWarehouse={warehouse}
            warehouses={warehouses}
            inventory={selectedInventory}
        />
        </>
    );
}

export default InventoryTable;