import React from 'react'
import logo from "../../../assets/images/logo.png"
import "./Header.scss"
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../redux/reducer/authSlice';

export default function Header() {
    const checkLogin = useSelector(state => state.auth.checkLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logOut())
        navigate("/login")
    }

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
                <div className='header_search'>
                    <input type="text" className='input_search' placeholder='Tìm kiếm ...' />
                </div>
                <div className='header_user'>
                    <img src="https://bizweb.dktcdn.net/100/362/077/themes/746584/assets/user.png?1700551333835" alt="" />
                    <div className='header_user_child'>
                        {checkLogin ?
                            <>
                                <div className='header_user_child_one'>
                                    <NavLink className="navlink_checkout" onClick={handleLogout}>Đăng xuất</NavLink>
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
                {checkLogin ?
                    <div className='header_bills'>
                        <img src="https://bizweb.dktcdn.net/100/362/077/themes/746584/assets/icon-cart.png?1700551333835" alt="" />
                    </div> :
                    <></>
                }

            </div>
        </>
    )
}
