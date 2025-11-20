/**
 * @module api/deleteInventory
 * @description Deletes an inventory item from a specific warehouse by sending a DELETE request to the backend API.
 *
 * @param {Object} inventory - The inventory data to delete.
 * @param {number} inventory.warehouseId - The ID of the warehouse from which to delete the inventory.
 * @param {number} inventory.productId - The ID of the product to delete from the warehouse.
 * @returns {Promise<string>} A promise that resolves to a success message if the inventory is deleted successfully.
 * @throws {Error} Throws an error if the API request fails.
 */

export default async function deleteInventory(inventory) {
    const { warehouseId, productId } = inventory;
    console.log(inventory);
    try {
        const response = await fetch(`http://localhost:8080/warehouses/${warehouseId}/inventory`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productId)
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