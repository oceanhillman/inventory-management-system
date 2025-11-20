import { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"

import ActionsMenu from "@/components/ActionsMenu"
import CreateProductModal from './CreateProductModal'
import AddInventoryModal from './AddInventoryModal'
import EditProductModal from './EditProductModal'
import DeleteProductModal from './DeleteProductModal'
import { ChevronDown, ChevronUp } from 'lucide-react'

const ProductsTable = ({ data, onChangeView, warehouse, handleAddInventory, handleCreateProduct, handleEditProduct,
    handleDeleteProduct }) => {

    const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);
    const [addDialogIsOpen, setAddDialogIsOpen] = useState(false);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortedBy, setSortedBy] = useState("sku");
    const [sortMethod, setSortMethod] = useState("ascending");
    const [sortedData, setSortedData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setSortedData([...data].sort((a, b) => {
            const fieldA = a[sortedBy];
            const fieldB = b[sortedBy];

            if (fieldA < fieldB) return sortMethod === "ascending" ? -1 : 1;
            if (fieldA > fieldB) return sortMethod === "ascending" ? 1 : -1;
            return 0;
        }));
    }, [sortedBy, sortMethod, data]);

    useEffect(() => {
        setFilteredData(sortedData.filter(product =>
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [sortedData, searchTerm]);

    const renderChevron = (field) => {
        if (sortedBy === field) {
            return sortMethod === "ascending" ? <ChevronUp /> : <ChevronDown />;
        }
    };

    const productActions = [
        {title:"Add to inventory", action: (product) => addInventory(product)},
        {title:"Edit product details", action: (product) => {
            setSelectedProduct(product);
            setEditDialogIsOpen(true);
        }},
        {title:"Delete", action: (product) => {
            setSelectedProduct(product);
            setDeleteDialogIsOpen(true);
        }}
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
                <h1 className="text-neutral-50 text-4xl font-bold">{warehouse.name}</h1>
                <h2 className="text-neutral-500 text-3xl font-bold">Products</h2>
            </div>
            <div className="flex flex-row justify-between">
                <Button onClick={() => onChangeView('inventory')} className="bg-neutral-700 text-neutral-100 border-neutral-600 border-1 shadow cursor-pointer">
                Back to inventory
                </Button>
                <Button onClick={setCreateDialogIsOpen} className="bg-neutral-700 text-neutral-100 border-neutral-600 border-1 shadow cursor-pointer">
                Add new product
                </Button>
            </div>
            <div className="flex flex-row p-4 justify-center">
                <Input className="bg-neutral-700 text-neutral-100 placeholder:text-neutral-100 w-1/2 border-1 border-neutral-600"
                    placeholder="Search inventory..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
            </div>

            <div className="rounded-xl overflow-hidden shadow border-neutral-700 border-1">
                <Table className="bg-neutral-700 text-neutral-200">
                    <TableHeader className="bg-neutral-800 text-neutral-100">
                        <TableRow>

                            <TableHead onClick={() => {
                                if (sortedBy === "sku") setSortMethod(sortMethod === "ascending" ? "descending" : "ascending");
                                setSortedBy("sku");
                            }} className="cursor-pointer">
                                <div className="flex items-center gap-1">
                                    SKU
                                    {renderChevron("sku")}
                                </div>
                            </TableHead>

                            <TableHead onClick={() => {
                                if (sortedBy === "name") setSortMethod(sortMethod === "ascending" ? "descending" : "ascending");
                                setSortedBy("name");
                            }} className="cursor-pointer">
                                <div className="flex items-center gap-1">
                                    Name
                                    {renderChevron("name")}
                                </div>
                            </TableHead>

                            <TableHead onClick={() => {
                                if (sortedBy === "description") setSortMethod(sortMethod === "ascending" ? "descending" : "ascending");
                                setSortedBy("description");
                            }} className="cursor-pointer text-center">
                                <div className="flex items-center justify-center gap-1">
                                    Description
                                    {renderChevron("description")}
                                </div>
                            </TableHead>

                            <TableHead onClick={() => {
                                if (sortedBy === "category") setSortMethod(sortMethod === "ascending" ? "descending" : "ascending");
                                setSortedBy("category");
                            }} className="cursor-pointer">
                                <div className="flex items-center gap-1">
                                    Category
                                    {renderChevron("category")}
                                </div>
                            </TableHead>

                            <TableHead onClick={() => {
                                if (sortedBy === "price") setSortMethod(sortMethod === "ascending" ? "descending" : "ascending");
                                setSortedBy("price");
                            }} className="cursor-pointer">
                                <div className="flex items-center gap-1">
                                    Price
                                    {renderChevron("price")}
                                </div>
                            </TableHead>

                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredData.map((row) => (
                        <TableRow key={row.id} onClick={() => addInventory(row)} 
                        className="hover:bg-neutral-600 cursor-pointer border-neutral-500">
                            <TableCell className="font-medium h-14">{row.sku}</TableCell>
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
            <EditProductModal
                open={editDialogIsOpen}
                setOpen={setEditDialogIsOpen}
                onSubmit={(id, body) => onEditProduct(id, body)}
                product={selectedProduct}
            />
            <DeleteProductModal
                open={deleteDialogIsOpen}
                setOpen={setDeleteDialogIsOpen}
                onDelete={() => {
                    handleDeleteProduct(selectedProduct?.id);
                    setDeleteDialogIsOpen(false);
                    setSelectedProduct(null);
                }}
                product={selectedProduct}
            />
        </>
    );
}

export default ProductsTable;
