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
import EditProductModal from './EditProductModal'

const ProductsTable = ({ data, onChangeView, warehouse, handleAddInventory, handleCreateProduct, handleEditProduct }) => {

    const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);
    const [addDialogIsOpen, setAddDialogIsOpen] = useState(false);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const productActions = [
        {title:"Add to inventory", action: (product) => addInventory(product)},
        {title:"Edit product details", action: (product) => {
            setSelectedProduct(product);
            setEditDialogIsOpen(true);
        }},
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

      const onEditProduct = (id, body) => {
        setEditDialogIsOpen(false);
        handleEditProduct(id, body);
    }


    return (
        <>  
            <div className="flex flex-col items-center justify-center p-4">
                <h1 className="text-neutral-100 text-2xl font-bold">Products</h1>
                <h2 className="text-neutral-500 text-xl font-bold">{warehouse.name}</h2>
            </div>
            <div className="flex flex-row justify-between p-4">
                <Button onClick={() => onChangeView('inventory')} className="bg-neutral-100 cursor-pointer">
                Back to inventory
                </Button>

                <Button onClick={setCreateDialogIsOpen} className="bg-neutral-100 cursor-pointer">
                Add new product
                </Button>
            </div>

            <Table className="bg-neutral-700 text-neutral-200 shadow">
                
                <TableHeader className="bg-neutral-800 text-neutral-100">
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
                    className="hover:bg-neutral-600 cursor-pointer border-neutral-500 border-1">
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
            <EditProductModal
                open={editDialogIsOpen}
                setOpen={setEditDialogIsOpen}
                onSubmit={(id, body) => onEditProduct(id, body)}
                product={selectedProduct}
            />
        </>
    );
}

export default ProductsTable;