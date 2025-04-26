import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import OrderDetailService from '../../Service/OrderDetailService';

function OrderDetail() {
    // Dữ liệu chi tiết đơn hàng mẫu
    const [orderdetail, setOrderDetail] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            const result = await OrderDetailService.getAll();
            console.log(result);
            setOrderDetail(result);

        })();
    }, []);
    const handleDelete = (id) => {
        alert(`Xóa banner với ID: ${id}`);
        // Logic xóa sản phẩm tại đây
    };

    // Hàm xử lý chỉnh sửa
    const handleEdit = (id) => {
        alert(`Chỉnh sửa banner với ID: ${id}`);
        // Logic chỉnh sửa sản phẩm tại đây
    };
    return (
        <div>
            <div className="w-full">
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">STT</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Id</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Order_ID</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Product_ID</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Quantity</th>
                           
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderdetail.map((detail, index) => (
                            <tr key={detail.id}>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{detail.id}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{detail.orderId}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{detail.productId}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{detail.quantity}</td>
                             
                                
                                <td className='px-6 py-4 border-b text-sm text-gray-900'>
                                    <button
                                        className="mr-2 px-4 py-2 text-blue-500 hover:text-blue-700"
                                        onClick={() => handleEdit(detail.id)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="px-4 py-2 text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(detail.id)}
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

export default OrderDetail;
