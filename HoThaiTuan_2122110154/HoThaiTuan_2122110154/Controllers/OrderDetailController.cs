using HoThaiTuan_2122110154.Controllers.Data;
using HoThaiTuan_2122110154.Controllers.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HoThaiTuan_2122110154.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderDetailController(AppDbContext context)
        {
            _context = context;
        }




        [HttpGet("by-order/{orderId}")]
        public async Task<IActionResult> GetByOrderId(int orderId)
        {
            var details = await _context.OrderDetails
                .Where(d => d.OrderId == orderId)
                .ToListAsync();

            return Ok(details);
        }
    }

}
