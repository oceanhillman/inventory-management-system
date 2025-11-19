export default async function getWarehouseById(id) {
    try {
        const response = await fetch(`http://localhost:8080/warehouses/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching warehouse: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}