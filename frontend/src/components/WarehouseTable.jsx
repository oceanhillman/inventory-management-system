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

import ActionsMenu from "@/components/ActionsMenu";

const WarehouseTable = ({ data, onChangeView, onSelectWarehouse, onDeleteWarehouse }) => {
    
    const handleClickViewInventory = (warehouse) => {
        onSelectWarehouse(warehouse);
        onChangeView("inventory");
    }

    const handleClickDelete = () => {
        
    }

    const warehouseActions = [
        {title:"View inventory", action: (warehouse) => {handleClickViewInventory(warehouse)}},
        {title:"Edit", action:{}},
        {title:"Delete", action: (warehouse) => handleClickDelete(warehouse)},
    ]

    return (
        <Table className="bg-neutral-700 text-neutral-100">
            
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
                    <TableCell className="text-right pr-7">
                        <ActionsMenu 
                            data={[row, row, row]}
                            actions={warehouseActions}
                        />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>

        </Table>
    );
}

export default WarehouseTable;