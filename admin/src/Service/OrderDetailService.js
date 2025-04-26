import Api from "../Api/Api"

const OrderDetailService = {
    getAll: () => Api.get('/OrderDetail'),
    
}
export default OrderDetailService