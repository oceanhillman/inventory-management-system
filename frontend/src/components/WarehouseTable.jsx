import { useState } from 'react'
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
import CreateWarehouseModal from "@/components/CreateWarehouseModal"
import DeleteWarehouseModal from "@/components/DeleteWarehouseModal"

const WarehouseTable = ({ data, onChangeView, onSelectWarehouse, handleDeleteWarehouse, handleCreateWarehouse }) => {

    const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [warehouseToDelete, setWarehouseToDelete] = useState(null);

    const warehouseActions = [
        {title:"View inventory", action: (warehouse) => {handleClickViewInventory(warehouse)}},
        {title:"Edit", action: () => {}},
        {title:"Delete", action: (warehouse) => {
            setWarehouseToDelete(warehouse);
            setDeleteDialogIsOpen(true)}
        }
    ];
    
    const handleClickViewInventory = (warehouse) => {
        onSelectWarehouse(warehouse);
        onChangeView("inventory");
    }

    const onSubmit = (body) => {
        setCreateDialogIsOpen(false);
        handleCreateWarehouse(body);
    }

    return (
        <>  
            <Table className="bg-neutral-700 text-neutral-100 my-4">
                
                <TableHeader className="bg-neutral-500">
                    <TableRow>
                        <TableHead>Warehouse</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-center">Capacity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((row) => (
                    <TableRow key={row.id} onClick={() => handleClickViewInventory(row)} className="hover:bg-neutral-500 cursor-pointer">
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell>
                            {row.location}</TableCell>
                        <TableCell className="text-center">{row.usedCapacity + "/" + row.capacity}</TableCell>
                        <TableCell className="text-right pr-5">
                            <ActionsMenu 
                                data={[row, row, row]}
                                actions={warehouseActions}
                            />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>

            </Table>
            <div className="flex flex-row justify-between">
                <Button onClick={() => setCreateDialogIsOpen(true)} className="bg-neutral-100 cursor-pointer">
                Add new warehouse
                </Button>
            </div>
            <DeleteWarehouseModal
                open={deleteDialogIsOpen}
                setOpen={setDeleteDialogIsOpen}
                warehouseName={warehouseToDelete?.name}
                onDelete={() => {
                    handleDeleteWarehouse(warehouseToDelete?.id);
                    setDeleteDialogIsOpen(false);
                    setWarehouseToDelete(null);
                }}
            />
            <CreateWarehouseModal 
                open={createDialogIsOpen}
                setOpen={setCreateDialogIsOpen}
                onSubmit={(body) => onSubmit(body)}
            />
        </>
    );
}

export default WarehouseTable;