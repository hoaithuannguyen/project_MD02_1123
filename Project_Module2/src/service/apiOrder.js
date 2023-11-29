import publicAxios from "../config/configAxios";

export default {
    getOrderByUser: async (id) => {
        console.log(id);
        return await publicAxios.get(`orders?user_id=${id}`);
    },
    createOrder: async (order) => {
        return await publicAxios.post("orders", order);
    },
};
