import { useState, useEffect } from 'react'
import './index.css'

import { Button } from './components/ui/button'

import WarehouseTable from './components/WarehouseTable'
import InventoryTable from './components/InventoryTable'

import { getWarehouses, updateInventory } from './lib/api'

function App() {
    const [warehouses, setWarehouses] = useState(null);
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

    const RenderView = () => {
        if (view === "warehouses") {
            return (
                <WarehouseTable 
                    data={warehouses}
                    onChangeView={(view) => setView(view)}
                    onSelectWarehouse={(warehouse) => setSelectedWarehouse(warehouse)}
                />
            )
        } else if (view === "inventory") {
            return (
                <InventoryTable
                    warehouse={selectedWarehouse}
                    onChangeView={(view) => setView(view)}
                    onSaveChanges={(changes) => fetchUpdateInventory(changes)}
                />
            )
        }
    }

    if (loading) return <div>Loading</div>;
    if (!warehouses) return <div>No data found</div>;

    return (
        <>
            <div className="flex min-h-svh flex-col items-center justify-center bg-neutral-800">
                <div className="w-5/6">
                <p>{message}</p>
                    <RenderView />
                </div>
            </div>
        </>
    )
}

export default App
