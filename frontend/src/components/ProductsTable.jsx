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
import CreateProductModal from './CreateProductModal'
import AddInventoryModal from './AddInventoryModal'

const ProductsTable = ({ data, onChangeView, warehouse, handleAddInventory, handleCreateProduct }) => {

    const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);
    const [addDialogIsOpen, setAddDialogIsOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const productActions = [
        {title:"Add to inventory", action: (product) => addInventory(product)},
        {title:"Edit", action: () => {}},
        {title:"Delete", action: () => {}}
    ];

    const addInventory = (product) => {
        setSelectedProduct(product);
        setAddDialogIsOpen(true);
    }
    
    const onSubmitInventory = (body) => {
        setCreateDialogIsOpen(false);
        handleAddInventory(body);
    }

    const onSubmitProduct = (body) => {
        setCreateDialogIsOpen(false);
        handleCreateProduct(body);
    }

    return (
        <>  
            <Table className="bg-neutral-700 text-neutral-100 my-4">
                
                <TableHeader className="bg-neutral-500">
                    <TableRow>
                        <TableHead>SKU</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((row) => (
                    <TableRow key={row.id} onClick={() => addInventory(row)} 
                    className="hover:bg-neutral-600 cursor-pointer">
                        <TableCell className="font-medium">{row.sku}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell className="text-center">{row.description}</TableCell>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>{"$" + row.price}</TableCell>
                        <TableCell className="text-right pr-5">
                            <ActionsMenu 
                                data={[row, row, row]}
                                actions={productActions}
                            />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>

            </Table>
            <div className="flex flex-row justify-between">
                <Button onClick={() => onChangeView('inventory')} className="bg-neutral-100 cursor-pointer">
                Back to inventory
                </Button>

                <Button onClick={setCreateDialogIsOpen} className="bg-neutral-100 cursor-pointer">
                Add new product
                </Button>
            </div>
            <CreateProductModal
                open={createDialogIsOpen}
                setOpen={setCreateDialogIsOpen}
                onSubmit={(body) => onSubmitProduct(body)}
            />
            <AddInventoryModal
                open={addDialogIsOpen}
                setOpen={setAddDialogIsOpen}
                onSubmit={(body) => onSubmitInventory(body)}
                warehouse={warehouse}
                selectedProduct={selectedProduct}
            />
        </>
    );
}

export default ProductsTable;