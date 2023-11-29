import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Bills.scss"
import { changeVND } from "../../utils/money.js"

export default function Bills() {
    const [flag, setFlag] = useState(true)

    const userLogin = JSON.parse(localStorage.getItem("userLogin"));

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/orders");
            setData(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [flag]);

    const dataRender = data.filter((item) => item.user_id == userLogin.id);
    //////
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const [details, setDetails] = useState([]);

    const handleShow = (details) => {
        setDetails(details);
        setShow(true);
    };
//
    const handleDegree = async (id, status) => {
        let confirm = window.confirm("Bạn có muốn hủy đơn hàng không ?")
        if (confirm) {
            await axios.patch(`http://localhost:8000/orders/${id}`, { status: status })
        }
        setFlag(!flag)
    }

    return (
        <div className="div_all_bill">
            {dataRender.map((item, index) => {
                return (
                    <div key={index} className="bills_users">
                        <div>Đơn hàng số:{index + 1}</div>
                        <div>Tên người nhận:{item.name}</div>
                        <div>Số điện thoại:{item.sdt}</div>
                        <div>Địa chỉ:{item.address}</div>
                        <div>Trạng thái:{item.status}</div>
                        <div>Tổng tiền:{changeVND(item.total)}</div>
                        <div>
                            {" "}
                            <Button
                                variant="primary"
                                onClick={() => handleShow(item.orderDetails)}
                                className="button-bootrap"
                                style={{ fontSize: "12px",marginRight:"5px" }}
                            >
                                Chi tiết
                            </Button>
                            <Button className="button-bootrap" onClick={() => handleDegree(item.id, "Hủy")} style={{fontSize:"12px"}}>
                                Hủy
                            </Button>
                        </div>
                        <div></div>
                    </div>
                );
            })}

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
                            <div>Giá:{changeVND(item.price)}</div>
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
    );
}
