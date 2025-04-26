import React, { useEffect, useState } from 'react';
import CategoryService from '../../Service/CategoryService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ApiImages } from '../../Api/ApiImages';
import { Link } from 'react-router-dom';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Switch from "react-switch";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Gọi API lấy danh sách danh mục
        const fetchCategories = async () => {
            try {
                const result = await CategoryService.getAll();
                setCategories(result); // Assuming the response structure is { data: [categories] }
            } catch (err) {
                setError('Có lỗi khi tải danh mục');
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

    const handleDeleteCategory = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await CategoryService.delete(id);
                // Remove the deleted category from the state
                setCategories(categories.filter(category => category.id !== id));
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
                    to="/category/add"
                    className="text-black bg-slate-400 px-4 py-2 rounded-lg shadow hover:bg-white hover:text-black transition mb-6 inline-block"
                >
                    Thêm danh mục
                    <IoMdAddCircleOutline />
                </Link>
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">STT</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Id</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Name</th>                
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories && categories.length > 0 && categories.map((category, index) => (
                            <tr key={category.id}>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{category.id}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{category.name}</td>

                               
                                
                                <td className="px-6 py-4 border-b text-sm text-gray-900">
                                    <Link
                                        to={`/category/edit/${category.id}`}
                                        className="mr-2 px-4 py-2 text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </Link>
                                    <Link
                                        className="px-4 py-2 text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        <FaTrash />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Category;
