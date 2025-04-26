import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import CategoryService from '../../Service/CategoryService';

export default function EditCategory() {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        name: '', // Chỉ có trường name
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await CategoryService.getId(id);
                const datacategory = response;
                if (datacategory) {
                    setCategory({
                        name: datacategory.name || '', // Chỉ lấy tên từ API
                    });
                } else {
                    throw new Error('Category not found');
                }
            } catch (err) {
                console.error("Error fetching category:", err);
                setError('Không thể tải thông tin danh mục.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();

        const categoryData = {
            name: category.name, // Chỉ gửi tên
        };

        try {
            await CategoryService.update(id, categoryData); // Gọi API để cập nhật
            navigate('/category'); // Chuyển hướng về trang danh sách category sau khi cập nhật
        } catch (err) {
            console.error("Error updating category:", err);
            setError('Không thể cập nhật danh mục.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-xl mx-auto py-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Chỉnh Sửa Danh Mục</h1>
            <form onSubmit={handleUpdateCategory} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên</label>
                    <input
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tên danh mục"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <FaEdit className="mr-2" /> Cập Nhật
                </button>
            </form>
        </div>
    );
}
