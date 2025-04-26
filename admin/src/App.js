import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './page/Navbar';
import MenuNew from './page/MenuNew';
import Dashboard from './layout/Dashboard';
import Product from './layout/Product/Product';
import AddProduct from './layout/Product/AddProduct';
import EditProduct from './layout/Product/EditProduct';

import Order from './layout/Order/Order';
import OrderDetail from './layout/Order/OrderDetail';
import User from './layout/User/User';
import EditUser from './layout/User/EditUser';
import TrashUser from './layout/User/TrashUser';

import Category from './layout/Category/Category';
import AddCategory from './layout/Category/AddCategory';
import EditCategory from './layout/Category/EditCategory';



import ProtectedRoute from './ProtectedRoute'; // ProtectedRoute Component
import Login from './layout/Authu/Login';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-full">
        {/* Sidebar */}
        <MenuNew sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Navbar setSidebarOpen={setSidebarOpen} />

          <div className="p-6 flex-1">
            <Routes>
              {/* Trang Login không cần bảo vệ */}
              <Route path="/login" element={<Login />} />

              {/* Bọc tất cả các routes cần bảo vệ bằng ProtectedRoute */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/products" element={<Product />} />
                      <Route path="/product/add" element={<AddProduct />} />
                      <Route path="/product/edit/:id" element={<EditProduct />} />

                      <Route path="/order" element={<Order />} />
                      <Route path="/orderdetail" element={<OrderDetail />} />
                      <Route path="/users" element={<User />} />
                      <Route path="/user/edit/:id" element={<EditUser />} />
                      <Route path="/trashusers" element={<TrashUser />} />

                      <Route path="/category" element={<Category />} />
                      <Route path="/category/add" element={<AddCategory />} />
                      <Route path="/category/edit/:id" element={<EditCategory />} />


                      <Route path="/order" element={<Order />} />
                      <Route path="/orderdetail" element={<OrderDetail />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
