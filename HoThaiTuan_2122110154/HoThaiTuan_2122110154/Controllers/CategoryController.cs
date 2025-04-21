using Microsoft.AspNetCore.Mvc;
using HoThaiTuan_2122110154.Controllers.Model;
using HoThaiTuan_2122110154.Controllers.Data;
using Microsoft.EntityFrameworkCore;

namespace HoThaiTuan_2122110154.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAll()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);
        }

        // GET: api/category/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetById(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            return Ok(category);
        }

        // POST: api/category
        [HttpPost]
        public async Task<ActionResult<Category>> Create(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
        }

        // PUT: api/category/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Category updated)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            category.Name = updated.Name;
            await _context.SaveChangesAsync();
            return Ok(category);
        }

        // DELETE: api/category/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return Ok(category);
        }
    }
}
