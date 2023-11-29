import React, { useState } from "react";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/footer";
import ProductDetail from "./pages/productDetail/productDetail";
import { Routes, Route, Outlet } from "react-router-dom";
import InfoUser from "./pages/InfoUser/InfoUser";
import ProductsAdmin from "./pages/admin/productadmin/ProductsAdmin";
import PrivateRouter from "./pages/privateRouter/privateRouter";
import CategoryAdmin from "./pages/admin/category/CategoryAdmin";
import UsersAdmin from "./pages/admin/userAdmin/UsersAdmin";
import Cart from "./pages/cart/Cart";
import Bills from "./pages/bills/Bills";
import BillsAdmin from "./pages/admin/billAdmin/BillsAdmin";
import Home from "./pages/home/Home";

export default function App() {
  //   const [userLogin, setUserLogin] = useState(JSON.parse(localStorage.getItem("userLogin")) || {})

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
              <Header /> <Outlet /> <Footer />
            </>
          }
        >
          <Route path="/" element={<Home />}></Route>
          <Route path="/details/:id" element={<ProductDetail />} />
          <Route path="/info" element={<InfoUser />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bills" element={<Bills />} />
        </Route>

        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* đúng role mới vào được admin */}

        <Route path="/admin" element={<PrivateRouter />}>
          <Route path="/admin" element={<ProductsAdmin />}></Route>
        </Route>
        <Route path="/admin/category" element={<PrivateRouter />}>
          <Route path="/admin/category" element={<CategoryAdmin />}></Route>
        </Route>
        <Route path="/admin/users-admin" element={<PrivateRouter />}>
          <Route path="/admin/users-admin" element={<UsersAdmin />}></Route>
        </Route>
        <Route path="/admin/bills-admin" element={<PrivateRouter />}>
          <Route path="/admin/bills-admin" element={<BillsAdmin />}></Route>
        </Route>
      </Routes>
    </>
  );
}
