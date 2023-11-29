import React from 'react'
import logo from "../../../assets/images/logo.png"
import "./Header.scss"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Header() {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    console.log("userLogin", userLogin);
    const navigate = useNavigate()

    const handleLogOut = async () => {
        await axios.put(`http://localhost:8000/users/${userLogin.id}`, userLogin)
        localStorage.removeItem("userLogin");
        window.location.href = "/";
    };

    return (
        <>
            <div className='header'>
                <div className='header_logo'>
                    <img src={logo} alt="" />
                </div>
                <div className='header_home'>
                    <NavLink to="/" className="navlink_home">Trang chủ</NavLink>
                </div>
                <div className='header_intro'>Giới thiệu</div>
                <div className='header_product'>Sản phẩm</div>
                <div className='header_product'>Tin tức</div>
                <div className='header_contact'>Liên hệ</div>

                <div className='header_user'>
                    <img src="https://bizweb.dktcdn.net/100/362/077/themes/746584/assets/user.png?1700551333835" alt="" />
                    <div className='header_user_child'>
                        {userLogin?.id ?
                            <>
                                <div className='header_user_child_one'>
                                    <NavLink className="navlink_checkout" onClick={handleLogOut}>Đăng xuất</NavLink>
                                </div>
                                <div>
                                    <NavLink to="/info" className="navlink_changeinfo" >Đổi thông tin</NavLink>
                                </div>
                            </> :
                            <>
                                <div className='header_user_child_one'>
                                    <NavLink to="/register" className="navlink_register">Đăng ký</NavLink>
                                </div>
                                <div>
                                    <NavLink to="/login" className="navlink_login">Đăng nhập</NavLink>
                                </div>
                            </>}
                    </div>
                </div>
                {userLogin?.id ?
                    <div className='header_bills'>
                        <NavLink to="/bills">
                            <img src="https://bizweb.dktcdn.net/100/362/077/themes/746584/assets/icon-cart.png?1700551333835" alt="" />
                        </NavLink>
                    </div> :
                    <></>
                }

            </div>
        </>
    )
}
