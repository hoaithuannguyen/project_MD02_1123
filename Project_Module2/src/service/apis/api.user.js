// import Password from "antd/es/input/Password"
import axios from "axios"

export default {
    // hàm register để đăng ký
    register: async (dataRegister) => {
        // return await axios.post(import.meta.env + "/users",data)
        return await axios.post(import.meta.env.VITE_HOST + "users", dataRegister)
    },
    login: async (dataLogin) => {
        // return await axios.post(import.meta.env + "users",data)
        return await axios.post(`http://localhost:8000/users`, dataLogin)
    },
    // Bước 2
    checkRegister: async (dataCheck) => {
        // Bước 3
        return await axios.get(`http://localhost:8000/users?email=${dataCheck}`)
    },
    checkLogin: async (email, password) => {
        //nó sẽ trả về 1 obj chứa email và pass được truyền vào
        return await axios.get(`http://localhost:8000/users?email=${email}&password=${password}`)
    },

}
