using HoThaiTuan_2122110154.Controllers.Data;
using HoThaiTuan_2122110154.Controllers.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrderController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] Order order)
    {
        var userExists = await _context.Users.AnyAsync(u => u.Id == order.UserId);
        if (!userExists)
        {
            return BadRequest(new { message = "UserId không tồn tại" });
        }

        if (order.OrderDetails != null && order.OrderDetails.Any())
        {
            foreach (var detail in order.OrderDetails)
            {
                var product = await _context.Products.FindAsync(detail.ProductId);
                if (product == null)
                {
                    return BadRequest(new { message = $"ProductId {detail.ProductId} không tồn tại" });
                }

                if (product.Stock < detail.Quantity)
                {
                    return BadRequest(new { message = $"Sản phẩm {product.Name} không đủ hàng (còn {product.Stock})" });
                }

                product.Stock -= detail.Quantity; // Trừ tồn kho
                detail.Order = order;
            }
        }

        order.OrderDate = DateTime.Now;

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return Ok(order);
    }

    [HttpGet("by-user/{userId}")]
    public async Task<IActionResult> GetOrdersByUserId(int userId)
    {
        var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
        if (!userExists)
        {
            return NotFound(new { message = "User không tồn tại" });
        }

        var orders = await _context.Orders
            .Where(o => o.UserId == userId)
            .Include(o => o.User)
            .Include(o => o.OrderDetails)
            .ToListAsync();

        return Ok(orders);
    }


    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _context.Orders
            .Include(o => o.User) // liên kết với bảng Users
            .ToListAsync();

        return Ok(orders);
    }

}
