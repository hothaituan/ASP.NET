import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import UserService from '../../Service/UserSevice';
import Switch from "react-switch";
import { Link } from 'react-router-dom';
import { ApiImages } from '../../Api/ApiImages';


function User() {
    // Dữ liệu người dùng mẫu
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserService.getAll();
                console.log("user", response)
                if (response && response) {
                    setUser(response); // Lưu danh sách banner
                } else {
                    console.error("Unexpected response format:", response);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching banners:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchUser();
    }, []);
 
    const handleDeleteTrash = async (id) => {
        if (window.confirm("Are you sure you want to delete this brand?")) {
            try {
                await UserService.delete(id);
                // Remove the deleted brand from the state
                setUser(user.filter(user => user.id !== id));
            } catch (err) {
                console.error("Error deleting brand:", err);
                setError(err);
            }
        }
    };
    return (
        <div>
            <div className="w-full">
              
                <table id="example1" className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">STT</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Id</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Tên</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Tên đăng nhập</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Email</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Số điện thoại</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Địa chỉ</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Giới tính</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, index) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{user.id}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{user.username}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{user.email}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{user.phone}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{user.address}</td>
                               
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{user.gender}</td>
                               
                                <td className="px-6 py-4 border-b text-sm text-gray-900">
                                    <Link
                                        to={`/user/edit/${user.id}`}
                                        className="mr-2 px-4 py-2 text-blue-500 hover:text-blue-700"                                    >
                                        <FaEdit />
                                    </Link>
                                    <Link
                                        className="px-4 py-2 text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteTrash(user.id)}
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

export default User;
