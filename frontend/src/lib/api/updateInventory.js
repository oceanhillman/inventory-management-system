/**
 * @module api/updateInventory
 * @description Updates inventory for a specific warehouse by sending a PUT request to the backend API.
 *
 * @param {Object} request - The inventory update details (e.g., product IDs and quantities).
 * @param {number} warehouseId - The ID of the warehouse whose inventory is being updated.
 * @returns {Promise<Object>} A promise that resolves to the server response object containing the updated inventory details.
 * @throws {Error} Throws an error if the API request fails or the update cannot be completed.
 */

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