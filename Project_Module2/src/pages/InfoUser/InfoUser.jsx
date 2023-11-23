import { notification } from 'antd'
import React, { useState } from 'react'
import { failed, success } from '../../utils/noti';
import axios from 'axios';

function InfoUser() {

    const [infoPass, setInfoPass] = useState({
        oldPass: "",
        newPass: "",
        confirmPass: ""
    })

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setInfoPass({
            ...infoPass,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        console.log(infoPass);
        const userLogin = JSON.parse(localStorage.getItem("userLogin")) || {}
        if (infoPass.oldPass == userLogin.password) {
            if (infoPass.newPass != infoPass.oldPass) {
                if (infoPass.newPass == infoPass.confirmPass) {
                    userLogin.password = infoPass.newPass
                    localStorage.setItem("userLogin", JSON.stringify(userLogin))
                    await axios.put(`http://localhost:8000/users/${userLogin.id}`, userLogin)
                    success("Đổi mật khẩu thành công!")
                } else {
                    failed("Xác nhận lại mật khẩu mới")
                }
            } else {
                failed("Mật khẩu mới phải khác mật khẩu cũ")
            }
        } else {
            failed("Mật khẩu cũ không đúng")
        }
    }

    return (
        <div>
            <form>
                <div>
                    <label style={{ width: 120 }} htmlFor="change_password">Mật khẩu cũ: </label>
                    <input id='change_password' name='oldPass' type="password" onChange={handleChangeInput} />
                </div>
                <div>
                    <label style={{ width: 120 }} htmlFor="change_password">Mật khẩu mới: </label>
                    <input id='change_password' name='newPass' type="password" onChange={handleChangeInput} />
                </div>
                <div>
                    <label style={{ width: 120 }} htmlFor="change_password">Xác nhận mật khẩu mới: </label>
                    <input id='change_password' name='confirmPass' type="password" onChange={handleChangeInput} />
                </div>
                <div>
                    <button type='button' onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default InfoUser