export default async function transferInventory(source, dest, body) {
    try {
        const response = await fetch(`http://localhost:8080/warehouses/${source}/inventory/transfer/${dest}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );
        if (!response.ok) {
            throw new Error(`Error transferring inventory: ${response.headers.get("error")}`);
        }
        const result = await response.json();
        console.log(response);
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}