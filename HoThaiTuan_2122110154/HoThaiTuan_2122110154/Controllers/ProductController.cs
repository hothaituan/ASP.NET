using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using HoThaiTuan_2122110154.Controllers.Data;
using HoThaiTuan_2122110154.Controllers.Model;
using HoThaiTuan_2122110154.dto;

namespace HoThaiTuan_2122110154.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext pro;

        public ProductController(AppDbContext context)
        {
            pro = context;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await pro.Products
                .Include(p => p.Category)  // Bao gồm thông tin Category
                .ToListAsync();

            // Nếu bạn muốn trả về tên category thay vì toàn bộ đối tượng category
            var productList = products.Select(p => new
            {
                p.ID,
                p.Name,
                p.Price,
                p.Image,
                p.CreatedAt,
                p.Description,
                p.Stock,
                CategoryName = p.Category.Name  // Lấy tên category
            }).ToList();

            return Ok(productList);
        }


        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await pro.Products.FindAsync(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] ProductDto model)
        {
            // Kiểm tra danh mục có tồn tại không
            var category = await pro.Categories.FindAsync(model.CategoryId);
            if (category == null)
                return BadRequest(new { message = "Invalid CategoryId. Category not found." });

            // Lưu file ảnh
            string imagePath = null;
            if (model.Image != null && model.Image.Length > 0)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.Image.FileName);
                var filePath = Path.Combine("wwwroot/images", fileName); // Thư mục lưu ảnh
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.Image.CopyToAsync(stream);
                }
                imagePath = "/images/" + fileName;
            }

            // Tạo đối tượng Product
            var product = new Product
            {
                Name = model.Name,
                Price = model.Price,
                Description = model.Description,
                Stock = model.Stock,
                CreatedAt = DateTime.Now,

                CategoryId = model.CategoryId,
                Image = imagePath,
            };

            pro.Products.Add(product);
            await pro.SaveChangesAsync();

            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] ProductDto model)
        {
            var product = await pro.Products.FindAsync(id);
            if (product == null) return NotFound();

            product.Name = model.Name;
            product.Price = model.Price;
            product.Description = model.Description;
            product.Stock = model.Stock;

            if (model.Image != null && model.Image.Length > 0)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.Image.FileName);
                var filePath = Path.Combine("wwwroot/images", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.Image.CopyToAsync(stream);
                }
                product.Image = "/images/" + fileName;
            }

            await pro.SaveChangesAsync();
            return Ok(product);
        }


        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await pro.Products.FindAsync(id);
            if (product == null) return NotFound();

            pro.Products.Remove(product);
            await pro.SaveChangesAsync();
            return Ok(new { message = "Deleted successfully" });
        }
        // GET: api/Product/category/3
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetByCategoryId(int categoryId)
        {
            var products = await pro.Products
                .Include(p => p.Category)
                .Where(p => p.CategoryId == categoryId)
                .ToListAsync();

            var productList = products.Select(p => new
            {
                p.ID,
                p.Name,
                p.Price,
                p.Image,
                p.CreatedAt,
                p.Description,
                p.Stock,
                CategoryName = p.Category.Name
            }).ToList();

            return Ok(productList);
        }

    }
}