import React, { useEffect, useState } from 'react'
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./BillsAdmin.scss"
import { Link, NavLink } from 'react-router-dom';
import { changeVND } from "../../../utils/money"

export default function BillsAdmin() {
    const [flag, setFlag] = useState(true)
    const [dataOrder, setDataOrder] = useState([])
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/orders");
            setDataOrder(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    //
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const [details, setDetails] = useState([]);

    const handleShow = (details) => {
        setDetails(details);
        setShow(true);
    };

    //
    const handleAgree = async (id, status) => {
        await axios.patch(`http://localhost:8000/orders/${id}`, { status: status })
        setFlag(!flag)
    }
    const handleDegree = async (id, status) => {
        let confirm = window.confirm("Bạn muốn hủy đơn hàng không?")
        if (confirm) {
            await axios.patch(`http://localhost:8000/orders/${id}`, { status: status })
        }
        setFlag(!flag)
    }

    useEffect(() => {
        fetchData();
    }, [flag])
    return (
        <>
            <div style={{ display: "flex" }}>
                <div className='div_billAdmin'>

                    <div className="quanly" style={{ marginTop: "30px", fontSize: "20px" }}>
                        <NavLink className="abc" to="/admin/users-admin">Quản lý người dùng</NavLink>
                    </div>

                    <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
                        <Link className="abc" to="/admin">Quản lý sản phẩm</Link>
                    </div>
                    <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
                        <Link className="abc" to="/admin/category">Quản lý Category</Link>
                    </div>
                    <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
                        <Link className='abc' style={{ textDecoration: "none", color: "white", fontSize: "25px" }} to="/admin/bills-admin">Quản lý Hóa đơn</Link>
                    </div>



                </div>
                <div style={{marginTop:"50px",marginLeft:"150px"}}>
                    <h2 style={{ marginLeft: "210px", marginTop: "30px" }}>Quản lý hóa đơn</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên người nhận</th>
                                <th>Trạng thái</th>
                                <th>Giỏ hàng</th>
                                <th>Hóa đơn</th>
                                <th>Hành động</th>
                            </tr>

                        </thead>
                        {
                            dataOrder.map((item, index) => {
                                return <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        {item.status === "Đang chờ" ? (
                                            <span>Đang Chờ</span>
                                        ) : item.status === "Đồng ý" ? (
                                            <span>Xác nhận</span>
                                        ) : (
                                            <span>Từ chối</span>
                                        )}
                                    </td>
                                    <td>
                                        {" "}
                                        <Button
                                            variant="primary"
                                            onClick={() => handleShow(item.orderDetails)}
                                            style={{width:"90px",height:"30px",fontSize:"10px"}}
                                        >
                                            Chi tiết
                                        </Button>
                                    </td>
                                    <td>{changeVND(item.total)}</td>
                                    <td>
                                        {/* {item.status === "Đang chờ" ? ( */}
                                        <button onClick={() => handleAgree(item.id, "Đồng ý")} style={{border:"none",marginRight:"5px"}}>Xác nhận</button>
                                        {/* ) : (
                                    ""
                                )} */}

                                        {/* {item.status === "Đang chờ" ? ( */}
                                        <button onClick={() => handleDegree(item.id, "Hủy")} style={{ border: "none" }}>Hủy</button>
                                        {/* ) : (
                                    ""
                                )} */}

                                    </td>
                                </tr>
                            })
                        }
                    </table>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {details.map((item) => (
                            <>
                                <div>
                                    <img style={{
                                        width: "100px", height: "auto"
                                    }} src={item.image} alt="" />
                                </div>
                                <div>Sản phẩm:{item.name}</div>
                                <div>Số lượng:{item.quantity}</div>
                                <div>Giá:{item.price}</div>
                            </>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
