import { useState, useEffect } from 'react'
import './index.css'

import { Button } from './components/ui/button'

import WarehouseTable from './components/WarehouseTable'
import InventoryTable from './components/InventoryTable'
import ProductsTable from './components/ProductsTable'

import { getWarehouses, updateInventory, deleteWarehouse, createWarehouse, getProducts, addInventory,
    getWarehouseById, createProduct, editWarehouse, deleteInventory, editProduct
 } from './lib/api'

function App() {
    const [warehouses, setWarehouses] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState("warehouses");
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [message, setMessage] = useState("");

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

    const fetchUpdateInventory = (changes) => {
        const patchRequests = changes.map((change) => {
            const requestBody = {
                productId: change.productId,
                quantity: change.quantity,
                storageLocation: change.storageLocation
            };

            return updateInventory(requestBody, change.warehouseId);
        })

        Promise.all(patchRequests)
        .then(responses => {
            return responses;
        })
        .then(() => {
            getWarehouses()
            .then(response => setWarehouses(response));
        })
        .catch(error => {
            console.error('One or more requests failed:', error);
        });
    };

    const fetchDeleteWarehouse = (id) => {
        deleteWarehouse(id)
        .then(() => {
            getWarehouses()
            .then(response => setWarehouses(response));
        });
    }

    const fetchCreateWarehouse = (body) => {
        createWarehouse(body)
        .then(() => {
            getWarehouses()
            .then(response => setWarehouses(response));
        });
    }

    const fetchAddInventory = (body) => {
        addInventory(body)
        .then(() => {
            getWarehouses()
            .then(response => setWarehouses(response));
        });
    }

    const fetchCreateProduct = (body) => {
        createProduct(body)
        .then(() => {
            getWarehouses()
            .then(response => setWarehouses(response));
        });
    }

    const fetchEditWarehouse = (id, body) => {
        editWarehouse(id, body)
        .then(() => {
            getWarehouses()
            .then(response => setWarehouses(response));
        });
    }

    const fetchDeleteInventory = (inventory) => {
        deleteInventory(inventory)
        .then(() => {
            getWarehouses()
            .then(response => setWarehouses(response));
        });
    }

    const fetchEditProduct = (id, body) => {
        editProduct(id, body)
        .then(() => {
            getWarehouses()
            .then(response => setWarehouses(response));
        });
    }

    const RenderView = () => {
        if (view === "warehouses") {
            return (
                <WarehouseTable 
                    data={warehouses}
                    onChangeView={(view) => setView(view)}
                    onSelectWarehouse={(warehouse) => setSelectedWarehouse(warehouse)}
                    handleDeleteWarehouse={(id) => fetchDeleteWarehouse(id)}
                    handleCreateWarehouse={(body) => fetchCreateWarehouse(body)}
                    handleEditWarehouse={(id, body) => fetchEditWarehouse(id, body)}
                />
            )
        } else if (view === "inventory") {
            return (
                <InventoryTable
                    warehouse={selectedWarehouse}
                    warehouses={warehouses}
                    onChangeView={(view) => setView(view)}
                    onSaveChanges={(changes) => fetchUpdateInventory(changes)}  
                    handleDeleteInventory={(inventory) => fetchDeleteInventory(inventory)}
                />
            )
        } else if (view === "products") {
            return (
                <ProductsTable
                    data={products}
                    warehouse={selectedWarehouse}
                    onChangeView={(view) => setView(view)}
                    handleAddInventory={(body) => fetchAddInventory(body)}
                    handleCreateProduct={(body) => fetchCreateProduct(body)}
                    handleEditProduct={(id, body) => fetchEditProduct(id, body)}
                />
            )
        }
    }

    if (loading) return <div>Loading</div>;
    if (!warehouses) return <div>No data found</div>;

    return (
        <>
            <div className="flex min-h-svh flex-col items-center justify-start bg-[#101010]">
                <div className="w-screen">
                <p>{message}</p>
                    <RenderView />
                </div>
            </div>
        </>
    )
}

export default App
