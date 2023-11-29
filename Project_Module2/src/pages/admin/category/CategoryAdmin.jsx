import React, { useEffect, useState } from 'react';
import "./CategoryAdmin.scss";
import axios from "axios";
import { Link, NavLink } from 'react-router-dom';
import { failed, success } from '../../../utils/noti';

export default function CategoryAdmin() {
    const [category, setCategory] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: ""
    });

    // Gọi category từ API về
    const handleGetCategory = async () => {
        const response = await axios.get("http://localhost:8000/category");
        setCategory(response.data);
    };

    useEffect(() => {
        handleGetCategory();
    }, []);
    // thêm sản phẩm
    const hanleAdd = async () => {
        if (newCategory.name == "") return;
        // check trung cate thì thôi ko post nữa nhé
        const res = await axios.get(`http://localhost:8000/category?name=${newCategory.name}`)
        if (res.data.length != 0) {
            failed("Category bị trùng rồi")
            setNewCategory({
                name: ''
            });
            return
        } else {
            // post lên API
            const response = await axios.post('http://localhost:8000/category', {
                // Đưa giá trị nhập vào lên API
                ...newCategory,
            });
            // Cập nhật state để thêm sản phẩm mới vào danh sách
            setCategory((dataCurrent) => [...dataCurrent, response.data]);
            // Reset dữ liệu của sản phẩm mới
            setNewCategory({
                name: ''
            });
        }
    };
    //xóa sản phẩm
    // xóa sản phẩm trên API
    const handleDelete = async (categoryId) => {
        if (window.confirm("Bạn muốn xóa không?")) {

            try {
                // Gửi yêu cầu DELETE đến API
                await axios.delete(`http://localhost:8000/category/${categoryId}`);

                // Cập nhật state để loại bỏ sản phẩm đã xóa

                setCategory((dataCurrent) =>
                    dataCurrent.filter((item) => item.id !== categoryId)
                );

            } catch (error) {
                console.error("Error deleting category:", error);
            }
        };
    }


    //showform edit
    const handleEdit = (product) => {
        setNewCategory({ ...product });
        setIsEditing(true);
    }
    // xử lý edit
    const handleEdit1 = async () => {
        try {
            let updatedCategory = { ...newCategory };
            // Gửi yêu cầu PUT
            const response = await axios.put(
                `http://localhost:8000/category/${newCategory.id}`,
                newCategory
            );

            // Cập nhật state
            setCategory((dataCurrent) =>
                dataCurrent.map((item) =>
                    item.id === updatedCategory.id ? response.data : item
                )
            );
            // Reset dữ liệu của sản phẩm mới
            setNewCategory({
                name: "",
            });
        } catch (error) {
            console.error("Error updating category:", error);
        }
        setIsEditing(false);

    };
    return (
        <>
            <div style={{ display: "flex" }}>
                <div className='headerAdmin_category'>
                    <div className="quanly" style={{ marginTop: "30px", fontSize: "20px" }}>
                        <NavLink className="abc" to="/admin/users-admin">Quản lý người dùng</NavLink>
                    </div>

                    <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
                        <Link className="abc" to="/admin">Quản lý sản phẩm</Link>
                    </div>
                    <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
                        <Link className="abc" to="/admin/category" style={{ color: "white", fontSize: "25px" }}>Quản lý Category</Link>
                    </div>
                    <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
                        <Link className='abc' style={{ textDecoration: "none", color: "black" }} to="/admin/bills-admin">Quản lý Hóa đơn</Link>
                    </div>
                </div>

                <div className='' style={{
                    marginTop: "20px",
                    marginLeft: "100px"
                }}>
                    <h2 style={{ marginLeft: "250px", marginTop: "30px" }}>Quản lý Category</h2>

                    <label htmlFor="name" style={{ marginTop: "40px", marginLeft: "100px" }}>Category</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        style={{
                            marginLeft: "10px"
                        }}
                    />
                    <br />
                    <button style={{ border: "none", marginTop: "20px", marginBottom: "50px", marginLeft: "175px", width: "100px", height: "40px" }} onClick={isEditing ? handleEdit1 : hanleAdd} >
                        {isEditing ? "Sửa" : "Thêm"}
                    </button>

                    <table className="table_admin_category">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <button onClick={() => handleEdit(item)}>Sửa</button>
                                        <button onClick={() => handleDelete(item.id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}
