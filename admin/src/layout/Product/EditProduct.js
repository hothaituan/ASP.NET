import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import ProductService from '../../Service/ProductService';
import CategoryService from '../../Service/CategoryService';

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: '',
        category_id: '',
        description: '',
        price: '',
        stock: '',
        image: null
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await ProductService.getId(id);
                setProduct({
                    name: productData.name || '',
                    category_id: productData.category_id || '',
                    description: productData.description || '',
                    price: productData.price || '',
                    stock: productData.stock || '',
                    image: null // Hình ảnh không truyền về lại nên sẽ null
                });

                const categoryList = await CategoryService.getAll();
                setCategories(categoryList);
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu sản phẩm:', err);
                setError('Không thể tải thông tin sản phẩm.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setProduct(prev => ({ ...prev, image: e.target.files[0] }));
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('category_id', product.category_id);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('stock', product.stock);
        if (product.image) {
            formData.append('image', product.image);
        }

        try {
            await ProductService.update(id, formData);
            navigate('/products');
        } catch (err) {
            console.error('Lỗi khi cập nhật sản phẩm:', err);
            setError('Không thể cập nhật sản phẩm.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-xl mx-auto py-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Chỉnh Sửa Sản Phẩm</h1>
            <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div>
                    <label className="block text-gray-600 mb-1">Tên sản phẩm</label>
                    <input type="text" name="name" value={product.name} onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Danh mục</label>
                    <select name="category_id" value={product.category_id} onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded">
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Mô tả</label>
                    <textarea name="description" value={product.description} onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Giá</label>
                    <input type="number" name="price" value={product.price} onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Số lượng</label>
                    <input type="number" name="stock" value={product.stock} onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div>
                    <label className="block text-gray-600 mb-1">Ảnh sản phẩm</label>
                    <input type="file" onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <button type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600">
                    <FaEdit className="mr-2" /> Cập Nhật
                </button>
            </form>
        </div>
    );
}
