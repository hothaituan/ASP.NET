import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ProductService from '../../Service/ProductService';
import { ApiImages } from '../../Api/ApiImages';
import { Link } from 'react-router-dom';
import { IoMdAddCircleOutline } from 'react-icons/io';

function Product() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Gọi ProductService.getAll thay vì getList
        const fetchData = async () => {
            try {
                const result = await ProductService.getAll();  // Đảm bảo sử dụng đúng hàm
                setProducts(result);  // Giả sử API trả về { data: { products: [...] } }
            } catch (error) {
                console.error("Có lỗi khi lấy dữ liệu sản phẩm:", error);
            }
        };
        fetchData();
    }, []);

    // Hàm xử lý xóa
    const handleDeleteCategory = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await ProductService.delete(id);
                // Remove the deleted category from the state
                setProducts(products.filter(product => product.id !== id));
            } catch (err) {
                setError('Có lỗi khi xóa danh mục');
                console.error("Error deleting category:", err);
            }
        }
    };



    return (
        <div>
            <div className="w-full">
                <Link
                    to="/product/add"
                    className="text-black bg-slate-400 px-4 py-2 rounded-lg shadow hover:bg-white hover:text-black transition mb-6 inline-block"
                >
                    Thêm sản phẩm
                    <IoMdAddCircleOutline />
                </Link>
                <table id="example1" className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">STT</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Id</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Tên sản phẩm</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Hình ảnh</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Mô tả</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Giá</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Danh mục</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Số lượng</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 && products.map((product, index) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{product.id}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">
                                    {product.image && (
                                        <img
                                            src={`${ApiImages}${product.image}`}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover"
                                        />
                                    )}
                                </td>

                                <td className="px-6 py-4 border-b text-sm text-gray-900">{product.description}</td>

                                <td className="px-6 py-4 border-b text-sm text-gray-900">{product.price}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{product.categoryName}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{product.stock}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">
                                    <Link
                                        to={`/product/edit/${product.id}`}
                                        className="mr-2 px-4 py-2 text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </Link>
                                    <button
                                        className="px-4 py-2 text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteCategory(product.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Product;
