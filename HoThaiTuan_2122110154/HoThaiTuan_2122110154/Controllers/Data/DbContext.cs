using System.Collections.Generic;
using HoThaiTuan_2122110154.Controllers.Model;
using Microsoft.EntityFrameworkCore;

namespace HoThaiTuan_2122110154.Controllers.Data
{
    public class AppDbContext : DbContext // Đổi tên class từ DbContext -> AppDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Login> Login { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }



    }
}
