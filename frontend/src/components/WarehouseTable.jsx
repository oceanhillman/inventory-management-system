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
import EditWarehouseModal from "@/components/EditWarehouseModal"

const WarehouseTable = ({ data, onChangeView, onSelectWarehouse, handleDeleteWarehouse, handleCreateWarehouse,
    handleEditWarehouse }) => {

    const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    const warehouseActions = [
        {title:"View inventory", action: (warehouse) => {handleClickViewInventory(warehouse)}},
        {title:"Edit", action: (warehouse) => {
            setSelectedWarehouse(warehouse);
            setEditDialogIsOpen(true);
        }},
        {title:"Delete", action: (warehouse) => {
            setSelectedWarehouse(warehouse);
            setDeleteDialogIsOpen(true);
        }}
    ];
    
    const handleClickViewInventory = (warehouse) => {
        onSelectWarehouse(warehouse);
        onChangeView("inventory");
    }

    const handleSubmitCreate = (body) => {
        setCreateDialogIsOpen(false);
        handleCreateWarehouse(body);
    }

    const handleSubmitEdit = (id, body) => {
        setEditDialogIsOpen(false);
        handleEditWarehouse(id, body);
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
                    <TableRow key={row.id} onClick={() => handleClickViewInventory(row)} className="hover:bg-neutral-600 cursor-pointer">
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
                warehouseName={selectedWarehouse?.name}
                onDelete={() => {
                    handleDeleteWarehouse(selectedWarehouse?.id);
                    setDeleteDialogIsOpen(false);
                    setSelectedWarehouse(null);
                }}
            />
            <CreateWarehouseModal 
                open={createDialogIsOpen}
                setOpen={setCreateDialogIsOpen}
                onSubmit={(body) => handleSubmitCreate(body)}
            />
            <EditWarehouseModal
                open={editDialogIsOpen}
                setOpen={setEditDialogIsOpen}
                onSubmit={(id, body) => handleSubmitEdit(id, body)}
                warehouse={selectedWarehouse}
            />
        </>
    );
}

export default WarehouseTable;