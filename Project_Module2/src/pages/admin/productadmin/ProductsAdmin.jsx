import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductsAdmin.scss";
import { storage } from "../../../config/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
export default function ProductsAdmin() {
  const [data, setData] = useState([]);
  const [imgUpload, setImgUpload] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [category, setCategory] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    quantity: "",
    image: "",
  });
  const handleGetCategory = async () => {
    const response = await axios.get("http://localhost:8000/category");
    setCategory(response.data);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    handleGetCategory();
    fetchData();
  }, []); // [] đảm bảo useEffect chỉ chạy một lần sau khi component được render

  // xử lý thêm sản phẩm
  const handleAddProduct = async () => {
    try {
      if (imgUpload == null) return;
      const imageRef = ref(storage, `images/${imgUpload.name}`);
      uploadBytes(imageRef, imgUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          // Gửi yêu cầu POST đến API và lưu kết quả trả về
          const response = await axios.post("http://localhost:8000/products", {
            ...newProduct,
            image: url,
          });
          // Cập nhật state để thêm sản phẩm mới vào danh sách
          setData((dataCurrent) => [...dataCurrent, response.data]);
          // Reset dữ liệu của sản phẩm mới
          setNewProduct({
            name: "",
            price: "",
            description: "",
            categoryId: "",
            quantity: "",
            image: "",
          });
          setImgUpload(null);
          setUrlImage(null);
        });
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const changeImage = (e) => {
    let file = e.target.files[0];
    setImgUpload(file);
    const reader = new FileReader();
    reader.onload = () => {
      setUrlImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleDelete = async (productId) => {
    try {
      // Gửi yêu cầu DELETE đến API
      await axios.delete(`http://localhost:8000/products/${productId}`);

      // Cập nhật state để loại bỏ sản phẩm đã xóa
      setData((dataCurrent) =>
        dataCurrent.filter((item) => item.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleEditStart = (product) => {
    setNewProduct({ ...product });
    setIsEditing(true);
  };
  const handleEdit = async () => {
    try {
      // Xử lý upload ảnh mới nếu có
      let updatedProduct = { ...newProduct };
      if (imgUpload) {
        const imageRef = ref(storage, `images/${imgUpload.name}`);
        await uploadBytes(imageRef, imgUpload);
        const url = await getDownloadURL(imageRef);
        updatedProduct.image = url;
      }
      // Gửi yêu cầu PUT
      const response = await axios.put(
        `http://localhost:8000/products/${updatedProduct.id}`,
        updatedProduct
      );

      // Cập nhật state
      setData((dataCurrent) =>
        dataCurrent.map((item) =>
          item.id === updatedProduct.id ? response.data : item
        )
      );
      setNewProduct({
        name: "",
        price: "",
        description: "",
        categoryId: "",
        quantity: "",
        image: "",
      });
      setImgUpload(null);
      setUrlImage(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  return (
    <>
      {/* 7 trường dữ liệu để thêm sản phẩm */}
      <label htmlFor="">Tên</label>
      <input
        type="text"
        onChange={handleInputChange}
        name="name"
        value={newProduct.name}
      />
      <br />
      <label htmlFor="">Giá</label>
      <input
        type="text"
        onChange={handleInputChange}
        name="price"
        value={newProduct.price}
      />
      <br />
      <label htmlFor="">Mô tả</label>
      <input
        type="text"
        onChange={handleInputChange}
        name="description"
        value={newProduct.description}
      />
      <br />
      <label htmlFor="">Category</label>
      <select
        name="categoryId"
        onChange={handleInputChange}
        value={newProduct.categoryId}
      >
        <option value="">Chọn category</option>
        {category.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="">Số lượng</label>
      <input
        type="number"
        onChange={handleInputChange}
        name="quantity"
        value={newProduct.quantity}
      />
      <br />
      <label htmlFor="">Ảnh</label>
      <input type="file" onChange={changeImage} />
      <br />
      <img src={urlImage} alt="" style={{ width: "100px", height: "100px" }} />
      <button onClick={isEditing ? handleEdit : handleAddProduct}>
        {isEditing ? "Edit" : "Add"}
      </button>
      <table className="table_admin">
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
              <td>
                <img className="img_products_admin" src={item.image} alt="" />
              </td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleEditStart(item)}>Sửa</button>
                <button onClick={() => handleDelete(item.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
