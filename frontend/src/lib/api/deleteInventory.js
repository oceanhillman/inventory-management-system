export default async function deleteInventory(inventory) {
    const { warehouseId, productId } = inventory;
    console.log(inventory);
    try {
        const response = await fetch(`http://localhost:8080/warehouses/${warehouseId}/inventory`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productId)
            }
        );
        if (!response.ok) {
            throw new Error(`Error deleting warehouse: ${response.status}`);
        }
        
        return "Deleted successfully";
    } catch (error) {
        throw error;
    }
}