import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { changeVND } from "../../utils/money.js"

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const handleGetProduct = async () => {
        const info = await axios.get(`http://localhost:8000/products/${id}`);
        setProduct(info.data);
    };
    console.log(product);
    useEffect(() => {
        handleGetProduct();
    }, []);

    return (
        <>
            <div>
                <h3>Chi tiết sản phẩm</h3>
                <div>
                    <div>
                        <img src={product.image} alt="" width={300} />
                        <div>{product.name}</div>
                        <div>{changeVND(product.price)}</div>
                    </div>

                    <div>
                        <h5>Mô tả sản phẩm:{product.description}</h5>
                    </div>
                </div>
            </div>
        </>

    )
}
