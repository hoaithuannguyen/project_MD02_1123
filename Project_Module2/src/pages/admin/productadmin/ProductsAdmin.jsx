import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ProductsAdmin.scss"
import { storage } from '../../../config/firebase';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
export default function ProductsAdmin() {
  const [data, setData] = useState([]);
  const [imgUpload, setImgUpload] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: 0,
    quantity: 0,
    image: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products');
        setData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // [] đảm bảo useEffect chỉ chạy một lần sau khi component được render
  console.log("data", data);
  const handleDelete = async (productId) => {
    try {
      // Gửi yêu cầu DELETE đến API
      await axios.delete(`http://localhost:8000/products/${productId}`);

      // Cập nhật state để loại bỏ sản phẩm đã xóa
      setData(dataCurrent => dataCurrent.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // xử lý thêm sản phẩm
  const handleAddProduct = async () => {
    try {
      if (imgUpload == null) return;
      const imageRef = ref(storage, `images/${imgUpload.name}`);
      uploadBytes(imageRef, imgUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setNewProduct({...newProduct, image: url});
        })
      })
      // Gửi yêu cầu POST đến API để thêm sản phẩm mới
      const response = await axios.post('http://localhost:8000/products', newProduct);

      // Cập nhật state để thêm sản phẩm mới vào danh sách
      setData(dataCurrent => [...dataCurrent, response.data]);

      // Reset dữ liệu của sản phẩm mới
      setNewProduct({
        name: "",
        price: 0,
        description: "",
        categoryId: 0,
        quantity: 0,
        image: "null",
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: name === "price" || name === "quantity" ? parseInt(value, 10) : value,
    }));
  };
  const changeImage = (e) => {
    let file = e.target.files[0];
    setImgUpload(file);
    const reader = new FileReader();
    reader.onload = () => {
      setUrlImage(reader.result);
    };
    reader.readAsDataURL(file);
  }
  return (
    <>
      {/* 7 trường dữ liệu để thêm sản phẩm */}
      <label htmlFor="">Tên</label>
      <input type="text"
        onChange={handleInputChange}
        name="name"
        value={newProduct.name}
      /><br />
      <label htmlFor="">Giá</label>
      <input type="number"
        onChange={handleInputChange}
        name="price"
        value={newProduct.price}
      /><br />
      <label htmlFor="">Mô tả</label>
      <input type="text"
        onChange={handleInputChange}
        name="description"
        value={newProduct.description}
      /><br />
      <label htmlFor="">Category</label>
      <input type="number"
        onChange={handleInputChange}
        name="categoryId"
        value={newProduct.categoryId}
      /><br />
      <label htmlFor="">Số lượng</label>
      <input type="number"
        onChange={handleInputChange}
        name="quantity"
        value={newProduct.quantity}
      /><br />
      <label htmlFor="">Ảnh</label>
      <input type="file" onChange={changeImage} /><br />
      <img src={urlImage} alt="" style={{width:"100px",height:"100px"}}/>
      <button onClick={handleAddProduct}>Add</button>

      <table className='table_admin'>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Ảnh</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>

          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td><img className='img_products_admin' src={item.image} alt="" /></td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button>Sửa</button>
                <button onClick={() => handleDelete(item.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

