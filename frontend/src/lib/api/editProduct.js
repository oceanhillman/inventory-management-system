export default async function editWarehouse(id, body) {
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