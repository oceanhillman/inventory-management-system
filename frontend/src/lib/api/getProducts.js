/**
 * @module api/getProducts
 * @description Fetches all products from the backend API.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of product objects.
 * @throws {Error} Throws an error if the API request fails.
 */

export default async function getProducts() {
    try {
        const response = await fetch("http://localhost:8080/products");
        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}