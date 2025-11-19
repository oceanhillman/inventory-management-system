export default async function getProductById(id) {
    try {
        const response = await fetch(`http://localhost:8080/products/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching product: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}