import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setSidebarOpen }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken'); // Kiểm tra token
    const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin user

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login'); // Điều hướng về trang đăng nhập
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            {/* Nút mở sidebar */}
            <button
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="text-white text-2xl"
            >
                ☰
            </button>

            {/* Phần thông tin và nút Đăng nhập/Đăng xuất */}
            <div className="flex items-center gap-4">
                {token && user ? (
                    <span className="text-lg">Xin chào, <strong>{user.name}</strong>!</span>
                ) : null}

                {token ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Đăng xuất
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Đăng nhập
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
