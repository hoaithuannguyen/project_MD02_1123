import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductsAdmin.scss";
import { storage } from "../../../config/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { Pagination } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { changeVND } from "../../../utils/money"

export default function ProductsAdmin() {
  // data đựng giá trị products khi gọi API về
  const [data, setData] = useState([]);
  // imgUpload và urlImage liên quan đến firebase
  const [imgUpload, setImgUpload] = useState(null);
  const [urlImage, setUrlImage] = useState(null);
  // tạo cờ isEditing để gọi 1 trong 2 hàm và hiển thị add hoặc edit
  const [isEditing, setIsEditing] = useState(false);
  // category đựng giá trị category trên API về để hiển thị
  const [category, setCategory] = useState([]);
  //search
  const [search, setSearch] = useState("");

  // newProduct đựng các giá trị ô input
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    stocks: "",
    // image: "",
  });
  // tạo hàm handleInputChange gom các giá trị ô input thành 1 object
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  // changeImage liên quan đến firebase
  const changeImage = (e) => {
    let file = e.target.files[0];
    setImgUpload(file);
    const reader = new FileReader();
    reader.onload = () => {
      setUrlImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  // gọi category trên API về
  const handleGetCategory = async () => {
    const response = await axios.get("http://localhost:8000/category");
    setCategory(response.data);
  };
  // gọi products trên API về
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products?_sort=id&_order=desc");
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // useEffect dùng khi gọi APi, vì API là bất đồng bộ, nên cần useE chạy lại
  useEffect(() => {
    handleGetCategory();
    fetchData();
  }, [data]); // [] đảm bảo useEffect chỉ chạy một lần sau khi component được render

  // xử lý thêm sản phẩm
  const handleAddProduct = async () => {
    try {
      // liên quan đến firebase
      if (imgUpload == null) return;
      const imageRef = ref(storage, `images/${imgUpload.name}`);

      uploadBytes(imageRef, imgUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          // Gửi yêu cầu POST đến API và lưu kết quả trả về
          const response = await axios.post("http://localhost:8000/products", {
            // đưa giá trị nhập vào lên API
            ...newProduct,
            image: url,
            stocks: +newProduct.stocks,
            price: +newProduct.price
          });
          // Cập nhật state để thêm sản phẩm mới vào danh sách
          setData((dataCurrent) => [...dataCurrent, response.data]);
          // Reset dữ liệu của sản phẩm mới
          setNewProduct({
            name: "",
            price: "",
            description: "",
            categoryId: "",
            stocks: "",
            // image: "",
          });
          setImgUpload(null);
          setUrlImage(null);
        });
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  // xóa sản phẩm trên API
  const handleDelete = async (productId) => {
    try {
      // Gửi yêu cầu DELETE đến API
      if (window.confirm("Bạn muốn xóa không?")) {

        await axios.delete(`http://localhost:8000/products/${productId}`);

        // Cập nhật state để loại bỏ sản phẩm đã xóa

        setData((dataCurrent) =>
          dataCurrent.filter((item) => item.id !== productId)
        );

      }


    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  // hiển thị thông tin khi click vào nút "sửa"
  const handleEditStart = (product) => {
    window.scrollTo(0, 0);
    setNewProduct({ ...product });
    setIsEditing(true);
    setUrlImage(product.image);
  };
  // hàm chỉnh sửa sản phẩm
  const handleEdit = async () => {
    try {
      // Xử lý upload ảnh mới nếu có
      let updatedProduct = {
        ...newProduct, stocks: +newProduct.stocks,
        price: +newProduct.price
      };
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
        stocks: "",
        // image: "",
      });
      setImgUpload(null);
      setUrlImage(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  //
  //search và phân trang
  //bước 1 
  const getFilteredProducts = () => {
    return data.filter((item) => (search === "" || item.name.toLowerCase().includes(search.toLowerCase())));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filteredProducts = getFilteredProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  //search và phân trang
  //
  return (
    <>
      <div style={{ display: "flex" }}>

        <div className='headerAdmin_category' style={{ color: "red", width: "280px", height: "auto" }}>
          <div className="quanly" style={{ marginTop: "30px", fontSize: "20px" }}>
            <NavLink className="abc" to="/admin/users-admin">Quản lý người dùng</NavLink>
          </div>

          <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
            <Link className="abc" to="/admin" style={{ color: "white", fontSize: "25px" }}>Quản lý sản phẩm</Link>
          </div>
          <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
            <Link className="abc" to="/admin/category">Quản lý Category</Link>
          </div>
          <div className="quanly" style={{ marginTop: "70px", fontSize: "20px" }}>
            <Link className='abc' style={{ textDecoration: "none", color: "black" }} to="/admin/bills-admin">Quản lý Hóa đơn</Link>
          </div>
        </div>
        <div>
          <h2 style={{ marginLeft: "300px", marginTop: "30px" }}>Quản lý sản phẩm</h2>
          <table className="table_productAdmin" style={{ marginLeft: "150px" }}>
            <tr>
              <td>
                <label htmlFor="">Tên</label>
              </td>
              <td>
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="name"
                  value={newProduct.name}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">Giá</label>
              </td>
              <td>
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="price"
                  value={newProduct.price}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">Mô tả</label>
              </td>
              <td>
                <textarea
                  id="" cols="47" rows="5"
                  onChange={handleInputChange}
                  name="description"
                  value={newProduct.description}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">Category</label>
              </td>
              <td>
                <select
                  name="categoryId"
                  onChange={handleInputChange}
                  value={newProduct.categoryId}
                  style={{ cursor: "pointer" }}
                >
                  <option value="">Chọn category</option>
                  {category.map((item, index) => (
                    <option key={index}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">Số lượng</label>
              </td>
              <td>
                <input
                  type="number"
                  onChange={handleInputChange}
                  name="stocks"
                  value={newProduct.stocks}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">Ảnh</label>
              </td>
              <td>
                <input type="file"
                  onChange={changeImage}
                />
              </td>
            </tr>
            <tr>
              <td>
                <img src={urlImage}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
            </tr>
            <button style={{ marginLeft: "150px", border: "none", width: "140px", height: "40px" }} onClick={isEditing ? handleEdit : handleAddProduct}>
              {isEditing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
            </button>
          </table>


          <br />
          <div style={{
            marginLeft: "100px", marginTop: "30px"
          }}>
            <input className='inp_search_home' type="text"
              placeholder="Tìm kiếm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={{ marginLeft: "100px" }}>
            <table className="table_admin">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Ảnh</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Mô tả</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts
                  .filter(
                    (item) => (search === "" || item.name.toLowerCase().includes(search.toLowerCase()))
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <img className="img_products_admin" src={item.image} alt="" />
                      </td>
                      <td>{changeVND(item.price)}</td>
                      <td>{item.stocks}</td>
                      <td>{item.description}</td>
                      <td>
                        <button onClick={() => handleEditStart(item)}>Sửa</button>
                        <button onClick={() => handleDelete(item.id)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* buoc 2 phân trang và search */}
          <Pagination
            current={currentPage}
            onChange={onPageChange}
            pageSize={itemsPerPage}
            total={filteredProducts.length}
            className="pagination_product"
          />
        </div>
      </div>
    </>
  );
}
