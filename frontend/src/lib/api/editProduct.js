/**
 * @module api/editProduct
 * @description Edits an existing product by sending a PUT request to the backend API.
 *
 * @param {number} id - The ID of the product to edit.
 * @param {Object} body - The updated product data.
 * @param {string} body.sku - The SKU of the product.
 * @param {string} body.name - The name of the product.
 * @param {string} body.description - The description of the product.
 * @param {string} body.category - The category of the product.
 * @param {number} body.price - The price of the product (must be a number >= 0.01).
 * @returns {Promise<Object>} A promise that resolves to the updated product details from the server.
 * @throws {Error} Throws an error if any required fields are empty, the price is invalid, or the API request fails.
 */

export default async function editProduct(id, body) {
    if (body.sku === "" || body.name === "" || body.description === "" || body.category === "" || body.price === "") {
        throw new Error("Error editing product: please ensure there are no empty fields.");
    }
    if (isNaN(body.price) || body.price < 0.01) {
        throw new Error("Error editing product: please enter a valid price.");
    }
    try {
        const response = await fetch(`http://localhost:8080/products/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );
        if (!response.ok) {
            throw new Error(`Error updating product: ${response.status}`);
        }
        const result = await response.json();
        console.log(response);
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}