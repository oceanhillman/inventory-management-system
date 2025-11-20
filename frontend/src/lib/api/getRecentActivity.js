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