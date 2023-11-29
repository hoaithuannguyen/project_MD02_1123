import React, { useEffect, useState } from 'react';
import "./UsersAdmin.scss";
import axios from "axios";
import { Link, NavLink } from 'react-router-dom';

export default function UsersAdmin() {
    const [users, setUsers] = useState([]);
    console.log("users", users);
    // Gọi users từ API về
    const handleGetUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Hàm để sửa trạng thái
    const handleToggleStatus = async (userId, currentStatus) => {
        try {
            // Gọi API để cập nhật trạng thái bằng axios với phương thức PATCH
            await axios.patch(`http://localhost:8000/users/${userId}`, { status: !currentStatus });

            // Cập nhật trạng thái trong danh sách người dùng
            setUsers(prevUsers => {
                return prevUsers.map(user => {
                    if (user.id === userId) {
                        return { ...user, status: !currentStatus };
                    }
                    return user;
                });
            });
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };

    useEffect(() => {
        handleGetUsers();
    }, []);

    return (
        <>
            <div style={{display:"flex"}}>
                <div className='header_userAdmin'>

                    <div className="quanly" style={{ marginTop: "30px", fontSize: "20px" }}>
                        <NavLink className="abc" to="/admin/users-admin" style={{ color: "white", fontSize: "25px" }}>Quản lý người dùng</NavLink>
                    </div>

                    <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
                        <NavLink className="abc" to="/admin">Quản lý sản phẩm</NavLink>
                    </div>
                    <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
                        <NavLink className="abc" to="/admin/category">Quản lý Category</NavLink>
                    </div>
                    <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
                        <NavLink className='abc' style={{ textDecoration: "none", color: "black" }} to="/admin/bills-admin">Quản lý Hóa đơn</NavLink>
                    </div>

                </div>
                <div>
                    <h2 style={{ marginLeft: "300px", marginTop: "30px" }}>Quản lý người dùng</h2>

                    <table className="table_admin_users" style={{
                        marginLeft:"200px",marginTop:"50px"
                    }}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Tình trạng</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        {item.status ? "Active" : "Block"}
                                    </td>
                                    <td>
                                        <button onClick={() => handleToggleStatus(item.id, item.status)}>
                                            {
                                                item.role == "admin" ?
                                                    <></> :
                                                    item.status ? "Block" : "Active"
                                            }
                                        </button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
