export default async function updateInventory(request, warehouseId) {
    try {
        const response = await fetch(`http://localhost:8080/warehouses/${warehouseId}/inventory`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            }
        );
        if (!response.ok) {
            throw new Error(`Error updating inventory: ${response.headers.get("error")}`);
        }
        const result = await response.json();
        console.log(response);
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}