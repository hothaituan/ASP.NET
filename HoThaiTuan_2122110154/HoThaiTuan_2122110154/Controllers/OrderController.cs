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
        order.OrderDate = DateTime.Now;

        // Ràng buộc quan hệ
        if (order.OrderDetails != null && order.OrderDetails.Any())
        {
            foreach (var detail in order.OrderDetails)
            {
                detail.Order = order; // Gắn order cha
            }
        }

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return Ok(order);
    }


    [HttpGet]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _context.Orders.ToListAsync();
        return Ok(orders);
    }
}
