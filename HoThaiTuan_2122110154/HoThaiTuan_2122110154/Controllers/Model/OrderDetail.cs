using HoThaiTuan_2122110154.Controllers.Model;
using System.Text.Json.Serialization;

public class OrderDetail
{
    public int Id { get; set; }

    public int OrderId { get; set; } // Foreign key

    public int ProductId { get; set; }
    public int Quantity { get; set; }

    [JsonIgnore] // 👈 cái này giúp tránh deserialize từ client
    public Order? Order { get; set; }
}
