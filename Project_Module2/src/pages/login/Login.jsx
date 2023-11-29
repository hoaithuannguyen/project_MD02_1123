import React, { useEffect, useState } from 'react'
import "./Login.scss"
import { NavLink, useNavigate } from 'react-router-dom'
import { failed, success } from '../../utils/noti';
import api from "../../service/apis/api.user"

export default function Login() {
    // xử lý lên đầu trang
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    // tạo mắt mật khẩu
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    // lấy giá trị ô input

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleGetValue = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    //

    const navigate = useNavigate();


    // xử lý đăng nhập ,đưa lên API các thứ
    const handleLogin = () => {
        api.checkLogin(user.email, user.password)
            .then((res) => {
                if (res.data.length != 0) {
                    if (res.data[0].role === "admin") {
                        localStorage.setItem("userLogin", JSON.stringify(res.data[0]))
                        navigate("/admin");
                        return
                    }
                    if (res.data[0].status) {
                        localStorage.setItem("userLogin", JSON.stringify(res.data[0]))
                        success("Đăng nhập thành công")
                        setTimeout(() => {
                            navigate("/");
                        }, 1500);
                    } else {
                        failed("Tài khoản đã bị khóa")
                    }
                } else {
                    failed("Thông tin đăng nhập sai")
                }
            })
    };
    return (
        <div>
            <div className='body_login'>
                <div className='text_login'>ĐĂNG NHẬP TÀI KHOẢN</div>
                <div>
                    <div className='personal_information'>Khách hàng đăng nhập</div>
                    <div className='body_name'>
                        <label htmlFor="input_email">Email *</label>
                        <div>
                            <input type="text"
                                id='input_email'
                                name="email"
                                value={user.email}
                                onChange={handleGetValue}
                            />
                        </div>
                    </div>
                    <div className='body_name'>
                        <label htmlFor="input_password">Mật khẩu *</label>
                        <div>
                            <input
                                id='input_password'
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={user.password}
                                onChange={handleGetValue}
                            />
                            <span
                                id="toggle-password"
                                onClick={handleTogglePassword}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </div>
                    </div>
                    <div className='body_button_register'>
                        <div>Nếu chưa có tài khoản, click vào <NavLink to="/register" style={{ textDecoration: "none" }}>đây</NavLink> để đăng ký.</div>
                    </div>
                    <div className='body_button_register'>
                        <button onClick={handleLogin}>Đăng nhập</button>
                        <div className='body_button_register_home'><NavLink style={{ textDecoration: "none" }} to="/">Đi đến trang chủ</NavLink></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
