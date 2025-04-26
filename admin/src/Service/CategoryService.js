import Api from "../Api/Api"

const CategoryService = {
    getAll: () => Api.get('/Category'),
    create: (category) => Api.post('/Category', category), // Thêm danh mục mới
    update: (id, category) => Api.put(`/Category/${id}`, category), // Cập nhật danh mục
    delete: (id) => Api.delete(`/Category/${id}`), // Xóa sản phẩm
    getId: (id, category) => Api.get(`/Category/${id}`, category), // Cập nhật danh mục
}
export default CategoryService