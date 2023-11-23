import React, { useEffect, useState } from 'react'
import "./Home.scss"
import { Link } from 'react-router-dom';
import axios from "axios"

export default function Home() {
    const [products, setProducts] = useState([]);

    const [category, setCategory] = useState([])


    const handleCLickCategory = async (categoryId) => {
        if (categoryId == 0) {
            const result = await axios.get(`http://localhost:8000/products`)
            setProducts(result.data)
            return
        }
        const result = await axios.get(`http://localhost:8000/products?categoryId=${categoryId}`)
        setProducts(result.data)
    }
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


    return (
        <>
            <div>
                <ul style={{ display: "flex" }}>
                    <li className='item-cate' onClick={() => handleCLickCategory(0)}>Tat ca</li>
                    {category.map((item) =>
                        <li
                            key={item.id}
                            className='item-cate'
                            onClick={() => handleCLickCategory(item.id)}>
                            {item.name}
                        </li>
                    )}
                </ul>
            </div>
            <div className='products_home'>
                {products.map((item) => (
                    <div key={item.id} className='products_home_child'>
                        <div>
                            <Link
                                to={`/details/${item.id}`}
                                className="h-[200px] overflow-hidden"
                            >
                                <img className='img_home' src={item.image} alt="" />
                            </Link>
                        </div>
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                        <div><button className='btn_home'>Mua hàng</button></div>
                    </div>
                ))}
            </div>
        </>
    )
}
