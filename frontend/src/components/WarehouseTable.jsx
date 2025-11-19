import { useState, useEffect } from 'react'
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
import { ChevronDown, ChevronUp } from 'lucide-react'

const WarehouseTable = ({ data, onChangeView, onSelectWarehouse, handleDeleteWarehouse, handleCreateWarehouse,
    handleEditWarehouse }) => {

    const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [sortedBy, setSortedBy] = useState("name");
    const [sortMethod, setSortMethod] = useState("ascending");
    const [sortedData, setSortedData] = useState([]);

    

    useEffect(() => {
        setSortedData([...data].sort((a, b) => {
            const fieldA = a[sortedBy];
            const fieldB = b[sortedBy];

            if (fieldA < fieldB) {
                return sortMethod === "ascending" ? -1 : 1;
            }
            if (fieldA > fieldB) {
                return sortMethod === "ascending" ? 1 : -1;
            }
            return 0;
        }));
    }, [sortedBy, sortMethod, data]);

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

    const renderChevron = (field) => {
        if (sortedBy === field) {
            if (sortMethod === "ascending") {
                return (<ChevronUp />);
            } else {
                return (<ChevronDown />);
            }
        }
    }

    return (
        <>  <div className="flex flex-row items-center justify-center p-4">
                <h1 className="text-neutral-50 text-2xl font-bold pb-7">Warehouses</h1>
            </div>
            <div className="flex flex-row justify-between p-4">
                <div></div>
                <Button onClick={() => setCreateDialogIsOpen(true)} className="bg-neutral-200 cursor-pointer">
                Add new warehouse
                </Button>
            </div>

            <Table className="bg-neutral-700 text-neutral-200 shadow">
                
                <TableHeader className="bg-neutral-800 text-neutral-100">
                    <TableRow>
                        <TableHead onClick={() => {
                            if (sortedBy === "name") {
                                setSortMethod(sortMethod === "ascending" ? "descending" : "ascending")
                            }
                            setSortedBy("name");
                        }} className="cursor-pointer">
                            <div className="flex flex-row items-center">
                                Warehouse
                                {renderChevron("name")}
                            </div>
                        </TableHead>

                        <TableHead onClick={() => {
                            if (sortedBy === "location") {
                                setSortMethod(sortMethod === "ascending" ? "descending" : "ascending")
                            }
                            setSortedBy("location");
                        }} className="cursor-pointer">
                            <div className="flex flex-row items-center">
                                Location
                                {renderChevron("location")}
                            </div>
                        </TableHead>
                        <TableHead onClick={() => {
                            if (sortedBy === "capacity") {
                                setSortMethod(sortMethod === "ascending" ? "descending" : "ascending")
                            }
                            setSortedBy("capacity");
                        }} className="text-center cursor-pointer">
                            <div className="flex flex-row items-center justify-center">
                                Capacity
                                {renderChevron("capacity")}
                            </div>
                        </TableHead>

                        <TableHead className="text-right cursor-pointer">Actions</TableHead>

                    </TableRow>
                </TableHeader>

                <TableBody>
                    {sortedData.map((row) => (
                    <TableRow key={row.id} onClick={() => handleClickViewInventory(row)} className="hover:bg-neutral-600 cursor-pointer border-neutral-500">
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