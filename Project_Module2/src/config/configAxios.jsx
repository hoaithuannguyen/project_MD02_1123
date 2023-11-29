import axios from "axios";

const baseURL = import.meta.env.VITE_HOST;

const publicAxios = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default publicAxios;
