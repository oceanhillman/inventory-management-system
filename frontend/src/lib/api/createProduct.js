export default async function createProduct(body) {
    try {
        if (body.sku === "" || body.name === "" || body.description === "" || body.category === "" || body.price === "") {
            throw new Error("Error creating product: please ensure there are no empty fields.")
        }
        if (isNaN(body.price) || body.price < 0.01) {
            throw new Error("Error creating product: please enter a valid price.")
        }
        const response = await fetch(`http://localhost:8080/products`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );
        if (!response.ok) {
            throw new Error(`Error creating warehouse: ${response.status}`);
        }
        const result = await response.json();
        console.log(response);
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}