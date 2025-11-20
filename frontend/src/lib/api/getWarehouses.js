/**
 * @module api/getWarehouses
 * @description Fetches all warehouses from the backend API.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of warehouse objects.
 * @throws {Error} Throws an error if the API request fails.
 */

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