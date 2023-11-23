import React, { useEffect, useState } from 'react'
import "./Login.scss"
import { NavLink, useNavigate } from 'react-router-dom'
// import axios from "axios";
// import { notification } from "antd";
import { failed, success } from '../../utils/noti';
import api from "../../service/apis/api.user"
import { useDispatch } from 'react-redux';
import { isLogin } from '../../redux/reducer/authSlice';

export default function Login() {
    const dispatch = useDispatch();
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
                    localStorage.setItem("userLogin", JSON.stringify(res.data[0]))
                    success("Đăng nhập thành công")
                    dispatch(isLogin())
                    navigate("/");
                    return
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
                        <div>Nếu chưa có tài khoản, click vào <NavLink to="/register">đây</NavLink> để đăng ký.</div>
                    </div>
                    <div className='body_button_register'>
                        <button onClick={handleLogin}>Đăng nhập</button>
                        <div className='body_button_register_home'><NavLink to="/">Đi đến trang chủ</NavLink></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
