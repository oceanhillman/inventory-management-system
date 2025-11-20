/**
 * @module api/deleteWarehouse
 * @description Deletes a warehouse by its ID by sending a DELETE request to the backend API.
 *
 * @param {number} id - The ID of the warehouse to delete.
 * @returns {Promise<string>} A promise that resolves to a success message if the warehouse is deleted successfully.
 * @throws {Error} Throws an error if the API request fails.
 */

export default async function deleteWarehouse(id) {
    try {
        const response = await fetch(`http://localhost:8080/warehouses/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if (!response.ok) {
            throw new Error(`Error deleting warehouse: ${response.status}`);
        }
        
        return "Deleted successfully";
    } catch (error) {
        throw error;
    }
}