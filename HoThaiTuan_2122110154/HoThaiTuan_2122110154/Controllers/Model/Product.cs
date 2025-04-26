namespace HoThaiTuan_2122110154.Controllers.Model
{
    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Image { get; set; }

        public DateTime CreatedAt { get; set; }
  
        public string Description { get; set; } 
        public int Stock { get; set; }

        // Thêm CategoryId (khóa ngoại)
        public int CategoryId { get; set; }

        // Navigation Property (liên kết đến Category)
        public Category? Category { get; set; }

    }
}
