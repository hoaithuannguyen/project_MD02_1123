import { BsCart4 } from "react-icons/bs";
import React, { useEffect, useState } from 'react'
import "./Home.scss"
import { Link } from 'react-router-dom';
import axios from "axios"
import { failed, success } from '../../utils/noti.js';
import { Pagination } from 'antd';
import Slider from "react-slick";
import { changeVND } from "../../utils/money.js"
export default function Home() {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");

    // phần giỏ hàng
    const currentUser = JSON.parse(localStorage.getItem("userLogin"));
    //B1: Tạo 1 state lưu giỏ hàng của người dùng ở trên local
    const [cart, setCart] = useState(currentUser?.cart);

    //lấy dữ liệu từ API về
    useEffect(() => {
        fetch("http://localhost:8000/products")
            .then(res => res.json())
            .then(data => {
                setProducts([...data])
            })

        fetch("http://localhost:8000/category")
            .then(res => res.json())
            .then(data => {
                setCategory([...data])
            })
    }, []);

    // xử lý khi chọn category
    const handleCLickCategory = async (categoryId) => {
        if (categoryId == 0) {
            const result = await axios.get(`http://localhost:8000/products`)
            setProducts(result.data)
            return
        }
        const result = await axios.get(`http://localhost:8000/products?categoryId=${categoryId}`)
        setProducts(result.data)
    }

    // phần giỏ hàng
    const handleAddToCart = (product) => {
        if (!userLogin.id) {
            alert("Vui lòng đăng nhập để mua hàng!");
            return;
        }
        //B2
        //Tìm vị trí sản phẩm xem đã có trong giỏ hàng chưa
        let index = cart.findIndex((item) => item.id === product.id);
        if (index != -1) {
            // Nếu tìm thấy thì đi vào đây
            success("Đã có sản phẩm trong giỏ hàng, số lượng + 1");
            cart[index].quantity += 1;
            setCart([...cart]);
        } else {
            // Nếu ko tìm thấy thì đi vào đây
            success("Đã thêm sản phẩm vào giỏ hàng");
            //B3
            // clone lại giỏ hàng cũ và thêm sản phẩm mới
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };
    //B4
    // Lưu local mỗi lần thêm vào giỏ hàng
    useEffect(() => {
        localStorage.setItem(
            "userLogin",
            JSON.stringify({ ...currentUser, cart })
        );
    }, [cart]);
    //search và phân trang
    const getFilteredProducts = () => {
        return products.filter(
            (item) => (search === "" || item.name.toLowerCase().includes(search.toLowerCase())));
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const filteredProducts = getFilteredProducts();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, endIndex);
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    //
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    //định dạng 
    // let VND = new Intl.NumberFormat('vi-VN', {
    //     style: 'currency',
    //     currency: 'VND',
    // });
    return (
        <>
            <div className='slider_home'>
                <Slider {...settings}>
                    <div>
                        <div><img className='img_banner' src='https://bizweb.dktcdn.net/100/362/077/themes/746584/assets/slider_1.jpg?1700551333835'></img></div>
                    </div>
                    <div>
                        <div><img className='img_banner' src='https://bizweb.dktcdn.net/100/362/077/themes/746584/assets/slider_2.jpg?1700551333835'></img></div>
                    </div>
                </Slider>
            </div>
            <div className='category_home'>
                <ul style={{ display: "flex" }} className="ul_home">
                    <li className='item-cate allProducts' onClick={() => handleCLickCategory(0)}>Tất cả sản phẩm</li>
                    {category.map((item) =>
                        <li
                            key={item.id}
                            className='item-cate'
                            onClick={() => handleCLickCategory(item.id)}>
                            {item.name}
                        </li>
                    )}
                </ul>
                <input className='inp_search_home' type="text"
                    placeholder="Tìm kiếm..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='products_home'>
                {displayedProducts
                    .filter(
                        (item) => (search === "" || item.name.toLowerCase().includes(search.toLowerCase()))
                    )
                    .map((item) => (
                        <div key={item.id} className='products_home_child'>
                            <div className="img_home_div">
                                <Link
                                    to={`/details/${item.id}`}
                                >
                                    <img className='img_home' src={item.image} alt="" />
                                </Link>
                            </div>
                            <div className="name_home">{item.name}</div>
                            <div className="price_home">{changeVND(item.price)}</div>
                            <div><button className='btn_home'
                                onClick={() => handleAddToCart(item)}>Mua hàng</button></div>
                        </div>
                    ))}
            </div>

            {userLogin?.id ?
                <Link className='cart_home' to="/cart"><BsCart4 className="bicart"></BsCart4> </Link>
                :
                <></>
            }
            <div className="number_card">{cart?.length}</div>
            <Pagination
                current={currentPage}
                onChange={onPageChange}
                pageSize={itemsPerPage}
                total={filteredProducts.length}
                className="pagination_home"
            />

        </>
    )
}
