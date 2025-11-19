export default async function getWarehouses() {
    try {
        const response = await fetch("http://localhost:8080/warehouses");
        if (!response.ok) {
            throw new Error(`Error fetching warehouses: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}