/**
 * @module api/editWarehouse
 * @description Edits an existing warehouse by sending a PUT request to the backend API.
 *
 * @param {number} warehouseId - The ID of the warehouse to edit.
 * @param {Object} body - The updated warehouse data.
 * @param {string} body.name - The name of the warehouse.
 * @param {string} body.location - The location of the warehouse.
 * @param {number} body.capacity - The maximum capacity of the warehouse (must be greater than 0).
 * @returns {Promise<Object>} A promise that resolves to the updated warehouse details from the server.
 * @throws {Error} Throws an error if any required fields are empty, the capacity is invalid, or the API request fails.
 */

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