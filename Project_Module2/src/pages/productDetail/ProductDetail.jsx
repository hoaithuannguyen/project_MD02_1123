import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
                        <div>{product.name}</div>
                        <img src={product.image} alt="" width={300} />
                        <div>{product.price}$</div>
                    </div>

                    <div>
                        <h4>{product.description}</h4>
                    </div>
                </div>
            </div>
        </>

    )
}
