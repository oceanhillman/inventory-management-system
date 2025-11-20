/**
 * @module api/deleteProduct
 * @description Deletes a product by its ID by sending a DELETE request to the backend API.
 *
 * @param {number} id - The ID of the product to delete.
 * @returns {Promise<string>} A promise that resolves to a success message if the product is deleted successfully.
 * @throws {Error} Throws an error if the API request fails.
 */

export default async function deleteProduct(id) {
    try {
        const response = await fetch(`http://localhost:8080/products/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if (!response.ok) {
            throw new Error(`Error deleting product: ${response.status}`);
        }
        
        return "Deleted successfully";
    } catch (error) {
        throw error;
    }
}