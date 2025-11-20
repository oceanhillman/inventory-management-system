/**
 * @module api/getProductById
 * @description Fetches a product by its ID from the backend API.
 *
 * @param {number} id - The ID of the product to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the product details.
 * @throws {Error} Throws an error if the API request fails.
 */

export default async function getProductById(id) {
    try {
        const response = await fetch(`http://localhost:8080/products/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching product: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}