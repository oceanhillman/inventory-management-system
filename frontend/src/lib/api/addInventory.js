/**
 * @module api/addInventory
 * @description Adds inventory of a product to a warehouse by sending a POST request to the backend API.
 *
 * @param {Object} body - The inventory data to add.
 * @param {number} body.warehouseId - The ID of the warehouse where inventory should be added.
 * @param {number} body.productId - The ID of the product to add.
 * @param {number} body.quantity - The quantity of the product to add (must be greater than 0).
 * @returns {Promise<Object>} A promise that resolves to the server response object containing the added inventory details.
 * @throws {Error} Throws an error if the quantity is invalid or if the API request fails.
 */
export default async function addInventory(body) {
    try {
        if (body.quantity <= 0) {
            throw new Error("Error adding inventory: quantity must be greater than zero.");
        }

        const response = await fetch(`http://localhost:8080/warehouses/${body?.warehouseId}/inventory`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );
        if (!response.ok) {
            throw new Error(`Error adding inventory: ${response.status}`);
        }
        const result = await response.json();
        console.log(response);
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}