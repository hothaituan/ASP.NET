import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryService from '../../Service/CategoryService';

function AddCategory() {
    const [category, setCategory] = useState({
        name: '',  // Chỉ giữ lại trường 'name'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value,
        });
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();

        // Kiểm tra xem tên danh mục có được nhập không
        if (!category.name.trim()) {
            setError('Tên danh mục không thể để trống.');
            return;
        }

        try {
            // Gọi API thêm category
            await CategoryService.create({ name: category.name });

            // Chuyển hướng về danh sách category
            navigate('/category');
        } catch (error) {
            setError('Có lỗi xảy ra khi thêm category.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Thêm Category</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleAddCategory} className="space-y-4">
                <div className="form-group">
                    <label className="block text-gray-600 mb-1">Tên Category:</label>
                    <input
                        type="text"
                        name="name"
                        value={category.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Thêm Category
                </button>
            </form>
        </div>
    );
}

export default AddCategory;
