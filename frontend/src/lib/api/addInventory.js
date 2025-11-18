export default async function addInventory(body) {
    try {
        const response = await fetch(`http://localhost:8080/warehouses/${body?.warehouseId}/inventory`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );
        if (!response.ok) {
            throw new Error(`Error adding inventory: ${response.status}`);
        }
        const result = await response.json();
        console.log(response);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}