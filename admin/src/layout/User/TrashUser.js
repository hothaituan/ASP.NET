import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaTrashRestore } from 'react-icons/fa';
import UserService from '../../Service/UserSevice';
import Switch from "react-switch";
import { Link } from 'react-router-dom';


function TrashUser() {
    // Dữ liệu người dùng mẫu
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserService.getList0();
                if (Array.isArray(response.user)) {
                    setUser(response.user); // Nếu là mảng, set trực tiếp
                } else {
                    setUser([response.user]); // Nếu là đối tượng, chuyển nó thành mảng
                }
            } catch (err) {
                console.error("Error fetching User:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);
    const handleRestoreUser= async (id) => {
        if (window.confirm("Ban co muon khoi phuc ")) {
            try {
                await UserService.restore(id);
                setUser(user.filter(user => user.id !== id));
            } catch (err) {
                console.error("Error deleting user:", err);
                setError(err);
            }
        }
    };
    const handleDestroyUser = async (id) => {
        if (window.confirm("Ban co muon xoa vinh vien ")) {
            try {
                await UserService.destroy(id);
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
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{user.email}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{user.phone}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{user.address}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{user.gender}</td>

                                <td className="px-6 py-4 border-b text-sm text-gray-900">
                                    <button
                                        onClick={() => handleRestoreUser(user.id)}
                                        className="px-4 py-2 text-green-500 hover:text-green-700 mr-2"
                                    >
                                        <FaTrashRestore />
                                    </button>
                                    <button
                                        onClick={() => handleDestroyUser(user.id)}
                                        className="px-4 py-2 text-red-500 hover:text-red-700"
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

export default TrashUser;
