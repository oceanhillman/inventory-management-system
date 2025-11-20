/**
 * @module api/getWarehouseById
 * @description Fetches a warehouse by its ID from the backend API.
 *
 * @param {number} id - The ID of the warehouse to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the warehouse details.
 * @throws {Error} Throws an error if the API request fails.
 */

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