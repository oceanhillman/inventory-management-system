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
import { Input } from "@/components/ui/input"

import ActionsMenu from "@/components/ActionsMenu"
import ProductDetailsModal from "@/components/ProductDetailsModal"
import DeleteInventoryModal from "@/components/DeleteInventoryModal"
import TransferInventoryModal from "@/components/TransferInventoryModal"
import { ChevronDown, ChevronUp } from "lucide-react"

const InventoryTable = ({ warehouse, warehouses, onChangeView, onSaveChanges, handleDeleteInventory, handleTransferInventory }) => {

    const [inventory, setInventory] = useState(warehouse.inventory);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [detailsDialogIsOpen, setDetailsDialogIsOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [transferDialogIsOpen, setTransferDialogIsOpen] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState(null);

    const originalRef = useRef(cloneDeep(warehouse.inventory));

    const [sortedBy, setSortedBy] = useState("productName");
    const [sortMethod, setSortMethod] = useState("ascending");
    const [sortedData, setSortedData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setSortedData([...inventory].sort((a, b) => {
            const fieldA = a[sortedBy];
            const fieldB = b[sortedBy];

            if (fieldA < fieldB) return sortMethod === "ascending" ? -1 : 1;
            if (fieldA > fieldB) return sortMethod === "ascending" ? 1 : -1;
            return 0;
        }));
    }, [sortedBy, sortMethod, inventory]);

    useEffect(() => {
        setFilteredData(sortedData.filter(inventory =>
            inventory.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inventory.storageLocation.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [sortedData, searchTerm]);

    const renderChevron = (field) => {
        if (sortedBy === field) {
            return sortMethod === "ascending" ? <ChevronUp /> : <ChevronDown />;
        }
    };

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

    const onTransfer = (source, dest, body) => {
        handleTransferInventory(source, dest, body);
        setTransferDialogIsOpen(false);
    };

    const handleClickSave = () => {
        const changes = inventory.filter((item, index) => {
            return !isEqual(item, originalRef.current[index]);
        });
        onSaveChanges(changes);
    };

    const updateQuantity = (val, productId) => {
    const items = cloneDeep(inventory);
    const item = items.find(i => i.productId === productId);
    if (item) item.quantity = Number(val);
    setInventory(items);
    setUnsavedChanges(true);
};

const updateStorageLocation = (val, productId) => {
    const items = cloneDeep(inventory);
    const item = items.find(i => i.productId === productId);
    if (item) item.storageLocation = String(val);
    setInventory(items);
    setUnsavedChanges(true);
};

const incrementQuantity = (e, productId) => {
    e.preventDefault();
    const items = cloneDeep(inventory);
    const item = items.find(i => i.productId === productId);
    if (item) item.quantity += 1;
    setInventory(items);
    setUnsavedChanges(true);
};

const decrementQuantity = (e, productId) => {
    e.preventDefault();
    const items = cloneDeep(inventory);
    const item = items.find(i => i.productId === productId);
    if (item) item.quantity -= 1;
    setInventory(items);
    setUnsavedChanges(true);
};


    return (<>
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-neutral-50 text-4xl font-bold">{warehouse.name}</h1>
            <h2 className="text-neutral-500 text-3xl font-bold">Inventory</h2>
        </div>
        <div className="flex flex-row justify-between space-x-4">
            <Button onClick={() => onChangeView('warehouses')} className="bg-neutral-700 text-neutral-100 border-neutral-600 border-1 shadow cursor-pointer">
                Back to warehouses
            </Button>

            {unsavedChanges && (
                <Button onClick={handleClickSave} className="bg-neutral-100 cursor-pointer">
                    Save changes
                </Button>
            )}

            <Button onClick={() => onChangeView('products')} className="bg-neutral-700 text-neutral-100 border-neutral-600 border-1 shadow cursor-pointer">
                View all products
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
                        <TableHead 
                            onClick={() => {
                                if (sortedBy === "productName") {
                                    setSortMethod(sortMethod === "ascending" ? "descending" : "ascending")
                                }
                                setSortedBy("productName");
                            }}
                            className="cursor-pointer"
                        >
                            <div className="flex flex-row items-center">
                                Product Name
                                {renderChevron("productName")}
                            </div>
                        </TableHead>

                        <TableHead 
                            onClick={() => {
                                if (sortedBy === "quantity") {
                                    setSortMethod(sortMethod === "ascending" ? "descending" : "ascending")
                                }
                                setSortedBy("quantity");
                            }}
                            className="cursor-pointer text-center"
                        >
                            <div className="flex flex-row items-center justify-center">
                                Quantity
                                {renderChevron("quantity")}
                            </div>
                        </TableHead>

                        <TableHead 
                            onClick={() => {
                                if (sortedBy === "storageLocation") {
                                    setSortMethod(sortMethod === "ascending" ? "descending" : "ascending")
                                }
                                setSortedBy("storageLocation");
                            }}
                            className="cursor-pointer text-left"
                        >
                            <div className="flex flex-row items-center">
                                Storage Location
                                {renderChevron("storageLocation")}
                            </div>
                        </TableHead>

                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="border-neutral-500">
                    {filteredData.map((row) => (
                        <TableRow key={'w'+row.warehouseId+'p'+row.productId} className="border-neutral-500">

                            <TableCell className="font-medium h-14">{row.productName}</TableCell>

                            <TableCell className="text-center">
                                <span onMouseDown={(e) => decrementQuantity(e, row.productId)} className="cursor-pointer px-1">-</span>

                                <input
                                    className="w-8 text-center text-neutral-50 placeholder-neutral-50 border-1 border-neutral-500 rounded"
                                    type="text"
                                    value={row.quantity}
                                    onChange={(e) => updateQuantity(e.target.value, row.productId)}
                                />

                                <span onMouseDown={(e) => incrementQuantity(e, row.productId)} className="cursor-pointer px-1">+</span>
                            </TableCell>

                            <TableCell>
                                <input
                                    className="border-1 border-neutral-500 rounded pl-1"
                                    type="text"
                                    value={row.storageLocation}
                                    onChange={(e) => updateStorageLocation(e.target.value, row.productId)}
                                />
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
        </div>

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
            onSubmit={(source, dest, body) => onTransfer(source, dest, body)}
            sourceWarehouse={warehouse}
            warehouses={warehouses}
            inventory={selectedInventory}
        />
    </>);
}

export default InventoryTable;
