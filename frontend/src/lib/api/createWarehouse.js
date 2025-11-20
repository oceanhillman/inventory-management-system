/**
 * @module api/createWarehouse
 * @description Creates a new warehouse by sending a POST request to the backend API.
 *
 * @param {Object} body - The warehouse data to create.
 * @param {string} body.name - The name of the warehouse.
 * @param {string} body.location - The location of the warehouse.
 * @param {number} body.capacity - The maximum capacity of the warehouse (must be greater than 0).
 * @returns {Promise<Object>} A promise that resolves to the server response object containing the created warehouse details.
 * @throws {Error} Throws an error if any required fields are empty, the capacity is invalid, or the API request fails.
 */

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