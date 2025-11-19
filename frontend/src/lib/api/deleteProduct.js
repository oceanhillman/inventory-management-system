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