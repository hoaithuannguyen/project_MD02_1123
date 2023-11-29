import React, { useEffect, useState } from 'react'
import { failed, success } from '../../utils/noti';
import axios from "axios";
import apiProducts from "../../service/apiProducts";
import apiOrder from "../../service/apiOrder";
import "./Cart.scss"
import { changeVND } from "../../utils/money.js"
import { NavLink, useNavigate } from 'react-router-dom'

export default function Cart() {

  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const [cart, setCart] = useState(userLogin?.cart);
  const [products, setProducts] = useState([]);
  //bill
  const [infoBill, setinforBill] = useState({
    name: "",
    sdt: "",
    address: "",
  });
  const handleInputChange = (e) => {
    setinforBill({ ...infoBill, [e.target.name]: e.target.value });
  };
  console.log(cart);
  const [total, setTotal] = useState(0);
  // gọi products trên API về
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);

  }, []); // [] đảm bảo useEffect chỉ chạy một lần sau khi component được render
  useEffect(() => {
    handleTotalPrice();
  }, [cart]);
  useEffect(() => {
    localStorage.setItem(
      "userLogin",
      JSON.stringify({ ...userLogin, cart })
    );
  }, [cart]);
  //Hàm cộng số lượng
  const handlePlus = (id) => {
    let index = cart.findIndex((item) => item.id === id);
    let findProdcut = products.find((product) => product.id === id);
    if (index > -1) {
      if (cart[index].quantity < findProdcut.stocks) {
        cart[index].quantity += 1;
        setCart([...cart]);
      } else {
        failed("Không thể thêm sản phẩm quá số lượng trong kho");
      }
    }
  };
  // Hàm trừ số lượng
  const handleMinus = (id) => {
    let index = cart.findIndex((item) => item.id === id);
    if (index > -1) {
      if (cart[index].quantity === 1) {
        if (window.confirm("Bạn muốn xóa không?")) {
          cart.splice(index, 1);
        }

      } else {
        cart[index].quantity -= 1;
      }
      setCart([...cart]);
    }
  };
  //xóa phần tử
  const confirm = (id) => {
    let newCart = cart.filter((item) => item.id !== id);
    if (window.confirm("Bạn muốn xóa không?")) {
      setCart(newCart);
    }
  };
  // Hàm tính tổng tiền
  const handleTotalPrice = () => {
    let totalPrice = cart?.reduce((acc, item) => {
      // acc là biến cộng dồn
      // item là từng phần tử trong mảng
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(totalPrice);
  };
  const navigate = useNavigate();

  //Thanh toán
  const handleCheckOut = async () => {
    if (infoBill.name == "" || infoBill.sdt == "" || infoBill.address == "") {
      alert("Vui lòng nhập thông tin khách hàng")
      return
    }
    //Trừ số lượng sản phẩm trong API
    let order = {
      ...infoBill,
      user_id: userLogin.id,
      total: +total,
      orderDetails: cart,
      status: "Đang chờ"
    };
    console.log(order);
    //Tạo order (bill)
    await apiProducts.updateStocks(cart);

    await apiOrder.createOrder(order);
    success("Thanh toán thành công");
    setCart([]);

    setTimeout(() => {
      navigate("/bills");
    }, 2000);


  };
  return (
    <>
      <div style={{ display: "flex" }} className='div_all_products_cart'>
        {
          cart?.map((item, index) => {
            return <div key={index} style={{}} className='all_products_cart'>
              <div><img src={item.image} alt="" style={{ width: "100%", height: "auto" }} /></div>
              <div className='cart_name'>{item.name}(Kho hàng còn:{item.stocks})</div>
              <div className='cart_price cart_name'>Giá:{changeVND(item.price)}</div>
              <div className='cart_btn cart_name'>
                <button onClick={() => handleMinus(item.id)} className='btn_cart_1'>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handlePlus(item.id)} className='btn_cart_1'>+</button>
              </div>
              <div className='cart_name'><button className='cart_btn_delete' onClick={() => confirm(item.id)}>Xóa sản phẩm</button></div>
              <div>
                <strong>Thành tiền:</strong> {changeVND(item.price * item.quantity)}
              </div>
            </div>
          })
        }
      </div>
      <h3>Tổng tiền: {changeVND(total)} </h3>
      <div className='thongtinkhachhang'>
        <h2>Thông tin khách hàng</h2>
        <table className='customer_cart'>
          <tbody className='tbody_cart'>
            <tr>
              <td><label htmlFor="">Tên</label></td>
              <td><input type="text" id=""
                onChange={handleInputChange}
                name="name"
                value={infoBill.name}
              /></td>
            </tr>
            <tr>
              <td><label htmlFor="">SĐT</label></td>
              <td><input type="text" id=""
                onChange={handleInputChange}
                name="sdt"
                value={infoBill.sdt}
              /></td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">Địa chỉ</label>
              </td>
              <td>
                <input type="text" id=""
                  onChange={handleInputChange}
                  name="address"
                  value={infoBill.address}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className='btn_thanhtoan' onClick={handleCheckOut}>Thanh toán</button>
      </div>
    </>
  )
}
