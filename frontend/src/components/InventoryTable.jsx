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


const InventoryTable = ({ warehouse, onChangeView, onSaveChanges }) => {

    const [inventory, setInventory] = useState(warehouse.inventory);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    const originalRef = useRef(cloneDeep(warehouse.inventory));

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

    const inventoryActions = [
        {title:"View product details", action:{}},
        {title:"Edit", action:{}},
        {title:"Transfer", action:{}},
        {title:"Delete", action:{}},
    ];

    return (<>
        <h1 className="text-center text-neutral-50">
            Inventory at: {warehouse.name}
        </h1>
        <Table className="bg-neutral-700 text-neutral-100 my-4">

            {/* <TableCaption>Inventory at: {warehouse.name}</TableCaption> */}
        
            <TableHeader className="bg-neutral-500">
                <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-left">Storage Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {inventory.map((row, index) => (
                <TableRow key={'w' + row.warehouseId + 'p' + row.productId} className="">
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
                            data={row}
                            actions={inventoryActions}
                        />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>

            {/* <TableFooter>
                <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter> */}

        </Table>
        <div className="flex flex-row justify-between">
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
        </>
    );
}

export default InventoryTable;