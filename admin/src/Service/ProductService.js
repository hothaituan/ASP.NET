import Api from "../Api/Api"

const ProductService = {
    getAll: () => Api.get('/Product'),
    create: (product) => Api.post('/Product', product),
    delete: (id) => Api.delete(`/Product/${id}`), // Xóa sản phẩm
    getId: (id, product) => Api.get(`/Product/${id}`, product),
    update: (id, product) => Api.put(`/Product/${id}`, product),
}
export default ProductService