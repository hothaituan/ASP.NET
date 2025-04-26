import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../../Service/ProductService'; // Thay thế bằng dịch vụ sản phẩm của bạn
import CategoryService from '../../Service/CategoryService';



function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    category_id: '',

    description: '',
    price: '',


    stock: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy danh mục
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAll(); // Điều chỉnh phương thức nếu cần
        setCategories(response);
      } catch (err) {
        console.error('Lỗi khi lấy danh mục:', err);
      }
    };



    fetchCategories();

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0],
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);

    formData.append('CategoryId', product.category_id);


    formData.append('description', product.description);
    formData.append('price', product.price);


    formData.append('stock', product.stock);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      await ProductService.create(formData); // Gọi API thêm sản phẩm
      navigate('/products'); // Điều hướng về trang danh sách sản phẩm sau khi thêm thành công
    } catch (err) {
      setError('Có lỗi xảy ra khi thêm sản phẩm');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Thêm Sản Phẩm</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleAddProduct} className="space-y-4">

        {/* Tên Sản Phẩm */}
        <div className="form-group">
          <label className="block text-gray-600 mb-1">Tên sản phẩm:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Slug */}


        {/* Danh Mục */}
        <div className="form-group">
          <label className="block text-gray-600 mb-1">Danh mục:</label>
          <select
            name="category_id"
            value={product.category_id}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mô Tả */}
        <div className="form-group">
          <label className="block text-gray-600 mb-1">Mô tả:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <div className="form-group">
          <label className="block text-gray-600 mb-1">Giá:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
            min="0"
            step="0.01"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>



        {/* Số Lượng */}
        <div className="form-group">
          <label className="block text-gray-600 mb-1">Số lượng:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            required
            min="0"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        {/* Hình Ảnh */}
        <div className="form-group">
          <label className="block text-gray-600 mb-1">Hình ảnh:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nút Gửi */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Thêm Sản Phẩm
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
