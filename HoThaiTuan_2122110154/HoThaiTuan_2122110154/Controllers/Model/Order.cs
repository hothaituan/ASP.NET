
namespace HoThaiTuan_2122110154.Controllers.Model
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }

        public int UserId { get; set; }
        public List<OrderDetail> OrderDetails { get; set; } 
    }

}