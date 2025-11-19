export default async function editWarehouse(warehouseId, body) {
    if (body.name === "" || body.location === "" || body.capacity === "") {
        throw new Error("Error editing warehouse: please ensure there are no empty fields.");
    }
    if (isNaN(body.capacity) || body.capacity <= 0) {
        throw new Error("Error editing warehouse: please enter a valid capacity.");
    }
    try {
        const response = await fetch(`http://localhost:8080/warehouses/${warehouseId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );
        if (!response.ok) {
            throw new Error(`Error updating warehouse: ${response.status}`);
        }
        const result = await response.json();
        console.log(response);
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}