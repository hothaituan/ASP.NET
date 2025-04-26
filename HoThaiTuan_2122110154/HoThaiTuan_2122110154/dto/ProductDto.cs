namespace HoThaiTuan_2122110154.dto
{
    public class ProductDto
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public IFormFile Image { get; set; }
        public string Description { get; set; }
        public int Stock { get; set; }

        public int CategoryId { get; set; }
    }
}
