/**
 * @module api/transferInventory
 * @description Transfers inventory from one warehouse to another by sending a POST request to the backend API.
 *
 * @param {number} source - The ID of the source warehouse.
 * @param {number} dest - The ID of the destination warehouse.
 * @param {Object} body - The inventory transfer details (e.g., product IDs and quantities).
 * @returns {Promise<Object>} A promise that resolves to the server response object containing the result of the transfer.
 * @throws {Error} Throws an error if the API request fails or the transfer cannot be completed.
 */

export default async function transferInventory(source, dest, body) {
    try {
        const response = await fetch(`http://localhost:8080/warehouses/${source}/inventory/transfer/${dest}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );
        if (!response.ok) {
            throw new Error(`Error transferring inventory: ${response.headers.get("error")}`);
        }
        const result = await response.json();
        console.log(response);
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}