import { useState, useEffect } from 'react'
import './index.css'

import { Button } from './components/ui/button'
import { toast } from "sonner"
import Breadcrumbs from "@/components/Breadcrumbs"


import WarehouseTable from './components/WarehouseTable'
import InventoryTable from './components/InventoryTable'
import ProductsTable from './components/ProductsTable'

import { getWarehouses, updateInventory, deleteWarehouse, createWarehouse, getProducts, addInventory,
    getWarehouseById, createProduct, editWarehouse, deleteInventory, editProduct, deleteProduct, transferInventory
 } from './lib/api'

function App() {
    const [warehouses, setWarehouses] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState("warehouses");
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);

    useEffect(() => {
        getWarehouses()
            .then(response => setWarehouses(response))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        getProducts()
            .then(response => setProducts(response));
        if (selectedWarehouse) {
            getWarehouseById(selectedWarehouse.id)
                .then(response => setSelectedWarehouse(response));
        }
    }, [warehouses])

   const fetchUpdateInventory = async (changes) => {
        try {
            const patchRequests = changes.map((change) => {
                const requestBody = {
                    productId: change.productId,
                    quantity: change.quantity,
                    storageLocation: change.storageLocation
                };
                return updateInventory(requestBody, change.warehouseId);
            });
            await Promise.all(patchRequests);
            const response = await getWarehouses();
            setWarehouses(response);
            toast.success("Inventory successfully updated.");
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Failed to update inventory.");
        }
    };

    const fetchDeleteWarehouse = async (id) => {
        try {
            await deleteWarehouse(id);
            const response = await getWarehouses();
            setWarehouses(response);
            toast.success("Warehouse successfully deleted.");
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Failed to delete warehouse.");
        }
    };

    const fetchAddInventory = async (body) => {
        try {
            await addInventory(body);
            const response = await getWarehouses();
            setWarehouses(response);
            toast.success("Inventory successfully added.");
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Failed to add inventory.");
        }
    };

    const fetchCreateProduct = async (body) => {
        try {
            await createProduct(body);
            const response = await getWarehouses();
            setWarehouses(response);
            toast.success(`Product "${body.name}" successfully created.`);
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Failed to create product.");
        }
    };

    const fetchEditWarehouse = async (id, body) => {
        try {
            await editWarehouse(id, body);
            const response = await getWarehouses();
            setWarehouses(response);
            toast.success(`Warehouse "${body.name}" successfully updated.`);
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Failed to update warehouse.");
        }
    };

    const fetchDeleteInventory = async (inventory) => {
        try {
            await deleteInventory(inventory);
            const response = await getWarehouses();
            setWarehouses(response);
            toast.success("Inventory entry successfully deleted.");
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Failed to delete inventory entry.");
        }
    };

    const fetchEditProduct = async (id, body) => {
        try {
            await editProduct(id, body);
            const response = await getWarehouses();
            setWarehouses(response);
            toast.success(`Product "${body.name}" successfully updated.`);
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Failed to update product.");
        }
    };

    const fetchDeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            const response = await getWarehouses();
            setWarehouses(response);
            toast.success("Product successfully deleted.");
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Failed to delete product.");
        }
    };

    const fetchTransferInventory = async (source, dest, body) => {
        try {
            await transferInventory(source, dest, body);
            const response = await getWarehouses();
            setWarehouses(response);
            toast.success("Inventory successfully transferred.");
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Failed to transfer inventory.");
        }
    };

    const fetchCreateWarehouse = async (body) => {
        try {
            await createWarehouse(body);
            toast.success(`Warehouse "${body.name}" successfully created.`);
            
            const response = await getWarehouses();
            setWarehouses(response);
        } catch (error) {

            toast.error(error?.message || "Failed to create warehouse.");
        }
    }

    const RenderView = () => {
        if (view === "warehouses") {
            return (
            <>
                <WarehouseTable 
                    data={warehouses}
                    onChangeView={(view) => setView(view)}
                    onSelectWarehouse={(warehouse) => setSelectedWarehouse(warehouse)}
                    handleDeleteWarehouse={(id) => fetchDeleteWarehouse(id)}
                    handleCreateWarehouse={(body) => fetchCreateWarehouse(body)}
                    handleEditWarehouse={(id, body) => fetchEditWarehouse(id, body)}
                />
            </>
            )
        } else if (view === "inventory") {
            return (
            <>
                <InventoryTable
                    warehouse={selectedWarehouse}
                    warehouses={warehouses}
                    onChangeView={(view) => setView(view)}
                    onSaveChanges={(changes) => fetchUpdateInventory(changes)}  
                    handleDeleteInventory={(inventory) => fetchDeleteInventory(inventory)}
                    handleTransferInventory={(source, dest, body) => fetchTransferInventory(source, dest, body)}
                />
            </>
            )
        } else if (view === "products") {
            return (
            <>
                <ProductsTable
                    data={products}
                    warehouse={selectedWarehouse}
                    onChangeView={(view) => setView(view)}
                    handleAddInventory={(body) => fetchAddInventory(body)}
                    handleCreateProduct={(body) => fetchCreateProduct(body)}
                    handleEditProduct={(id, body) => fetchEditProduct(id, body)}
                    handleDeleteProduct={(id) => fetchDeleteProduct(id)}
                />
            </>
            )
        }
    }

    return (
        <>
            <div className="flex min-h-svh flex-col items-center justify-start bg-[#101010]">
                <div className="w-screen">
                    <div className="p-4">
                        <Breadcrumbs
                            view={view}
                            setView={setView}
                            selectedWarehouse={selectedWarehouse}
                        />
                    </div>
                    <div className="px-4">
                        {!loading && warehouses ?
                            <RenderView /> : null
                        }
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default App
