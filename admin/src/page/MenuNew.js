import React, { useState } from 'react';
import logo from '../assets/images/images.png';
function MenuNew() {
    const [isOpenManagement, setIsOpenManagement] = useState(false);
    const [isOpenTrash, setIsOpenTrash] = useState(false);

    const toggleManagementMenu = () => {
        setIsOpenManagement(!isOpenManagement);
    };

    const toggleTrashMenu = () => {
        setIsOpenTrash(!isOpenTrash);
    };

    return (
        <div>
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-900 h-screen p-5">
                    {/* Logo */}

                    <a href="/" className="flex items-center p-4 border-b border-gray-700">
                        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full opacity-80" />
                        <span className="text-white text-2xl font-semibold">TailAdmin</span>
                    </a>



                    {/* Menu items */}
                    <div className="text-gray-400">
                        <p className="uppercase text-xs tracking-wider mb-3">Menu</p>

                        {/* Dashboard */}
                        <div className="mb-4">
                            <a href="/" className="flex items-center text-white bg-gray-700 p-3 rounded-lg hover:bg-gray-600">
                                Dashboard
                            </a>
                        </div>

                        {/* Quản lý */}
                        <div className="mb-4">
                            <a
                                href="#"
                                className="flex items-center text-white bg-gray-700 p-3 rounded-lg hover:bg-gray-600"
                                onClick={toggleManagementMenu}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M3 10h18M3 14h18M3 18h18" />
                                </svg>
                                Quản lý
                                <svg className="ml-auto w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>

                            {/* Menu con cho Quản lý */}
                            {isOpenManagement && (
                                <div className="ml-6 mt-2 space-y-2">
                                    <a href="/products" className="text-gray-400 hover:text-white block flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3z" />
                                        </svg>
                                        Sản phẩm
                                    </a>
                                 
                                    <a href="/category" className="text-gray-400 hover:text-white flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3z" />
                                        </svg>
                                        Danh mục
                                    </a>

                                    <a href="/order" className="text-gray-400 hover:text-white flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3z" />
                                        </svg>
                                        Đơn hàng
                                    </a>
                                    <a href="/orderdetail" className="text-gray-400 hover:text-white flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3z" />
                                        </svg>
                                       Chi tiết đơn hàng
                                    </a>
                                    <a href="/users" className="text-gray-400 hover:text-white flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3z" />
                                        </svg>
                                        Thành viên
                                    </a>
                                </div>
                            )}
                        </div>

                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuNew;
