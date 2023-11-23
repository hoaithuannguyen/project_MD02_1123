import React, { useState } from 'react'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/footer'
import ProductDetail from './pages/productDetail/productDetail'
import { Routes, Route, Outlet } from "react-router-dom"
import Home from './pages/home/Home'
import InfoUser from './pages/InfoUser/InfoUser'
import ProductsAdmin from './pages/admin/productadmin/ProductsAdmin'
export default function App() {

    //   const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem("userLogin")) || {})

    return (
        <>

            <Routes>
                <Route path='/' element={<> <Header /> <Outlet /> <Footer /></>}>
                    <Route path='/' element={<Home />}></Route>
                    <Route path="/details/:id" element={<ProductDetail />} />
                    <Route path="/info" element={<InfoUser />} />
                </Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/login' element={<Login />}></Route>

                <Route path='/admin' element={<ProductsAdmin />}></Route>

            </Routes>

        </>
    )
}
