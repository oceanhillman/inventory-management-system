/**
 * @module api/createProduct
 * @description Creates a new product by sending a POST request to the backend API.
 *
 * @param {Object} body - The product data to create.
 * @param {string} body.sku - The SKU of the product.
 * @param {string} body.name - The name of the product.
 * @param {string} body.description - The description of the product.
 * @param {string} body.category - The category the product belongs to.
 * @param {number} body.price - The price of the product (must be a number >= 0.01).
 * @returns {Promise<Object>} A promise that resolves to the server response object containing the created product details.
 * @throws {Error} Throws an error if any required fields are empty, the price is invalid, or the API request fails.
 */

export default async function createProduct(body) {
    try {
        if (body.sku === "" || body.name === "" || body.description === "" || body.category === "" || body.price === "") {
            throw new Error("Error creating product: please ensure there are no empty fields.")
        }
        if (isNaN(body.price) || body.price < 0.01) {
            throw new Error("Error creating product: please enter a valid price.")
        }
        const response = await fetch(`http://localhost:8080/products`,
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