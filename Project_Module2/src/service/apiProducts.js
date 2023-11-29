import publicAxios from "../config/configAxios";

export default {
    getAllProducts: async () => {
        return await publicAxios.get("products");
    },
    getProductDetails: async (id) => {
        return await publicAxios.get(`products/${id}`);
    },
    updateStocks: async (products) => {
        const response = await publicAxios.get("products");
        let allProductsFromAPI = response.data;
        const updatedProducts = products.map((product) => {
            const productFromAPI = allProductsFromAPI.find(
                (item) => item.id === product.id
            );
            if (productFromAPI && product.quantity) {
                return {
                    ...productFromAPI,
                    stocks: productFromAPI.stocks - product.quantity,
                };
            }
            return productFromAPI || product;
        });

        for (const product of updatedProducts) {
            if (product) {
                await publicAxios.put(`products/${product.id}`, {
                    ...product,
                    stocks: product.stocks,
                });
            }
        }
        return updatedProducts;
    },
};
