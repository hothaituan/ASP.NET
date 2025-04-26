
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken'); // Kiểm tra token trong localStorage

    if (!token) {
        // Nếu không có token, chuyển hướng về trang đăng nhập
        return <Navigate to="/login" replace />;
    }

    return children; // Nếu có token, hiển thị nội dung được bảo vệ
};

export default ProtectedRoute;
