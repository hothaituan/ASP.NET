import Api from "../Api/Api"

const OrderService = {
    getAll: () => Api.get('/Order'),
    
}
export default OrderService