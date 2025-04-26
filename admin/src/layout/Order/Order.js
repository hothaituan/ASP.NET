import React, { useEffect, useState } from 'react'
import CategoryService from '../../Service/CategoryService';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ApiImages } from '../../Api/ApiImages';
import { Link } from 'react-router-dom';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Switch from "react-switch";
import OrderService from '../../Service/OrderService';

const Category = () => {
    const [order, setOrder] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            const result = await OrderService.getAll();
            console.log(result);
            setOrder(result);

        })();
    }, []);
   
    //     if (window.confirm("Are you sure you want to delete this category?")) {
    //         try {
    //             await CategoryService.delete(id);
    //             // Remove the deleted brand from the state
    //             setCategories(categories.filter(category => category.id !== id));
    //         } catch (err) {
    //             console.error("Error deleting brand:", err);
    //             setError(err);
    //         }
    //     }
    // }
    // const handleUpdateStatus = async (id, currentStatus) => {
    //     const newStatus = currentStatus === 1 ? 2 : 1;
    //     console.log(`Dang cap nhat trang thai san pham ${id}, trang thai moi: ${newStatus}`);

    //     try {
    //         await CategoryService.status(id, { status: newStatus }); // Gọi API để cập nhật trạng thái
    //         setCategories(categories.map(categories =>
    //             categories.id === id ? { ...categories, status: newStatus } : categories
    //         ));
    //     } catch (err) {
    //         console.error("Error updating status:", err);
    //     }
    // };

    return (
        <div>
            <div className="w-full">
              
                <table className="min-w-full bg-white border-collapse">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">STT</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Id</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">User_ID</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Name</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Số điện thoại</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Email</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-900">Địa chỉ</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {order && order.length > 0 && order.map((order, index) => (
                            <tr key={order.id}>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{order.userId}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{order.user?.name}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{order.user?.phone}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{order.user?.email}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-900">{order.user?.address}</td>
                 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Category;
