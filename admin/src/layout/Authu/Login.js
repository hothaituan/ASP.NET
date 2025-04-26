import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../Service/UserSevice';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Giả sử bạn đã có API đăng nhập trả về thông tin user và token
            const response = await UserService.login({ username, password });

            // Kiểm tra trạng thái tài khoản
            // Lưu token và thông tin user vào localStorage
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            navigate('/'); // Điều hướng về trang chủ sau khi đăng nhập thành công
        } catch (error) {
            setError('Tên đăng nhập hoặc mật khẩu không chính xác!');
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-96 animate-fadeIn">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-8">
                    Đăng Nhập
                </h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Tên đăng nhập */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300"
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>

                    {/* Mật khẩu */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-300"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    {/* Thông báo lỗi */}
                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}

                    {/* Nút đăng nhập */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none"
                    >
                        Đăng Nhập
                    </button>
                </form>

                {/* Đăng ký */}
                <p className="text-sm text-center text-gray-600 mt-4">
                    Bạn đã quên mật khẩu chứ?{' '}
                    <a href="/forgot-password" className="text-purple-600 hover:underline transition">
                        Lấy lại ngay
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
