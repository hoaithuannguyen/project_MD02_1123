import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
    name: "auth",
    initialState: {
        checkLogin: false
    },
    reducers: {
        isLogin: (state) => {
            state.checkLogin = true
        },
        logOut: (state) => {
            state.checkLogin = false
        }
    }
})
export const { isLogin, logOut } = authSlice.actions
export default authSlice.reducer