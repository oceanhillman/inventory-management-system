/**
 * @module api/getRecentActivity
 * @description Fetches recent warehouse activity from the backend API.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of activity objects.
 * @throws {Error} Throws an error if the API request fails.
 */

export default async function getWarehouses() {
    try {
        const response = await fetch("http://localhost:8080/activity");
        if (!response.ok) {
            throw new Error(`Error getting recent activity: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}