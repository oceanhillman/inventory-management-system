export default async function createWarehouse(body) {
    try {
        if (body.name === "" || body.location === "" || body.capacity === "") {
            throw new Error("Error creating warehouse: please ensure there are no empty fields.");
        }
        if (isNaN(body.capacity) || body.capacity <= 0) {
            throw new Error("Error creating warehouse: please enter a valid capacity.");
        }
        const response = await fetch(`http://localhost:8080/warehouses`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );
        if (!response.ok) {
            throw new Error(`Error creating warehouse: ${response.status}`);
        }
        const result = await response.json();
        console.log(response);
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}