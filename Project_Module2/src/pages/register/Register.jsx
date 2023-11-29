import React, { useEffect, useState } from "react";
import "./Register.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import api from "../../service/apis/api.user";
import { failed, success } from "../../utils/noti";
export default function Register() {
  // xử lý lên đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //tạo mắt
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  //
  // xử lý đăng ký
  // lấy giá trị ô input
  const [newUser, setNewUser] = useState({
    // id: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const handleGetValue = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  //hàm để chuyển router
  const navigate = useNavigate();
  // xử lý đăng ký ,đưa lên API các thứ
  const handleRegister = async () => {
    if (
      !newUser.email ||
      !newUser.phone ||
      !newUser.password ||
      !newUser.confirmPassword
    ) {
      failed("Vui lòng điền đầy đủ thông tin");
      return;
    }
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
    if (!passwordRegex.test(newUser.password)) {
      failed(
        "Mật khẩu phải chứa ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      failed("Email không hợp lệ");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/; // Adjust this regex based on your phone number format
    if (!phoneRegex.test(newUser.phone)) {
      failed("Số điện thoại không hợp lệ");
      return;
    }

    // Bước 1
    api.checkRegister(newUser.email).then((res) => {
      // Bước 4: nhận về res.data
      console.log("RES", res);
      if (newUser.password !== newUser.confirmPassword) {
        failed("Mật khẩu không khớp");
        return;
      }
      if (res.data.length != 0) {
        failed("Tài khoản đã tồn tại");
        return;
      }
      delete newUser.confirmPassword;
      api.register({
        ...newUser,
        id: uuidv4(),
        cart: [],
        role: "user",
        status: true
      });
      success("Đăng ký thành công");
      setNewUser({
        // id: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    });
  };
  return (
    <div>
      <div className="body_register">
        <div className="text_register">ĐĂNG KÝ TÀI KHOẢN</div>
        <div>
          <div className="personal_information">Thông tin cá nhân</div>
          <div className="body_name">
            <label htmlFor="input_email">Email *</label>
            <div>
              <input
                type="text"
                id="input_email"
                onChange={handleGetValue}
                name="email"
                value={newUser.email}
              />
            </div>
          </div>
          <div className="body_name">
            <label htmlFor="input_phone">Số điện thoại *</label>
            <div>
              <input
                type="text"
                id="input_phone"
                onChange={handleGetValue}
                name="phone"
                value={newUser.phone}
              />
            </div>
          </div>
          <div className="body_name">
            <label htmlFor="input_password">Mật khẩu *</label>
            <div>
              <input
                id="input_password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={newUser.password}
                onChange={handleGetValue}
              />
              <span className="toggle-password" onClick={handleTogglePassword}>
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>
          <div className="body_name">
            <label htmlFor="input_re_password">Nhập lại mật khẩu *</label>
            <div>
              <input
                id="input_re_password"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={newUser.confirmPassword}
                onChange={handleGetValue}
              />
              <span className="toggle-password" onClick={handleTogglePassword}>
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>
          <div className="body_button_register">
            <div>
              Nếu đã có tài khoản, click vào <NavLink style={{ textDecoration: "none" }} to="/login">đây</NavLink>{" "}
              để đăng nhập.
            </div>
          </div>
          <div className="body_button_register">
            <button onClick={handleRegister}>Đăng ký</button>
            <div className="body_button_register_home">
              <NavLink style={{textDecoration:"none"}} to="/">Đi đến trang chủ</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
