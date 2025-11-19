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