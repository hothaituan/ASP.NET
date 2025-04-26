import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import UserService from '../../Service/UserSevice';

export default function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        username: '',
        password: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserService.getId(id);
                const dataUser = response;
                if (dataUser) {
                    setUser({
                        name: dataUser.name || '',
                        email: dataUser.email || '',
                        phone: dataUser.phone || '',
                        address: dataUser.address || '',
                        gender: dataUser.gender || '',
                        username: dataUser.username || '',
                        password: dataUser.password || ''
                    });
                } else {
                    throw new Error('User not found');
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                setError('Failed to load user details.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();

        const payload = {
            id: id, // ID người dùng
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            gender: user.gender,
            username: user.username
        };

        // Thêm mật khẩu mới nếu có
        if (user.password) {
            payload.password = user.password;
        }
        console.log("Payload gửi lên:", payload);

        try {
            await UserService.update(id, payload); // Gửi dữ liệu dưới dạng JSON
            navigate('/users'); // Điều hướng về trang danh sách người dùng
        } catch (err) {
            console.error("Error updating user:", err.response ? err.response.data : err.message);
    if (err.response?.data?.errors) {
        console.log("Validation errors:", err.response.data.errors);
    }
    setError('Failed to update user.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-semibold mb-6">Chỉnh Sửa Người Dùng</h1>
            <form onSubmit={handleUpdateUser} className="mb-6 flex flex-col space-y-4">
                <p>Tên</p>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="border px-4 py-2 rounded-lg"
                    placeholder="Tên người dùng"
                    required
                />

                <p>Email</p>
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="border px-4 py-2 rounded-lg"
                    placeholder="Email"
                    required
                />

                <p>Điện thoại</p>
                <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    className="border px-4 py-2 rounded-lg"
                    placeholder="Số điện thoại"
                    required
                />

                <p>Địa chỉ</p>
                <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    className="border px-4 py-2 rounded-lg"
                    placeholder="Địa chỉ"
                    required
                />

                <p>Giới tính</p>
                <select
                    name="gender"
                    value={user.gender}
                    onChange={handleInputChange}
                    className="border px-4 py-2 rounded-lg"
                    required
                >
                    <option value="">Chọn giới tính</option>
                    <option value="nam">Nam</option>
                    <option value="nữ">Nữ</option>
                </select>

                <p>Tên người dùng</p>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInputChange}
                    className="border px-4 py-2 rounded-lg"
                    placeholder="Tên người dùng"
                    required
                />

                <p>Mật khẩu mới (Xóa mật khẩu cũ để update mật khẩu mới)</p>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    className="border px-4 py-2 rounded-lg"
                    placeholder="Mật khẩu mới"
                />

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
                    <FaEdit className="mr-2" /> Cập Nhật
                </button>
            </form>
        </div>
    );
}
