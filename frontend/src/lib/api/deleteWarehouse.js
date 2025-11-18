export default async function deleteWarehouse(id) {
    try {
        const response = await fetch(`http://localhost:8080/warehouses/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        if (!response.ok) {
            throw new Error(`Error deleting warehouse: ${response.status}`);
        }
        
        return "Deleted successfully";
    } catch (error) {
        console.log(error);
    }
}