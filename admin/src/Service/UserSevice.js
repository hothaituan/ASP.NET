import Api from "../Api/Api";

const UserService = {
    login: (data) => Api.post('/User/login', data),
    register: (data) => Api.post('/User/register', data),
    getAll: () => Api.get('/User'),
    delete: (id) => Api.delete(`/User/${id}`), // Xóa sản phẩm
    getId: (id, users) => Api.get(`/User/${id}`, users),
    update: (id, users) => Api.put(`/User/${id}`, users),

};
export default UserService;