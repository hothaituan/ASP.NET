using HoThaiTuan_2122110154.Controllers.Data;
using HoThaiTuan_2122110154.Controllers.Model;
using HoThaiTuan_2122110154.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace HoThaiTuan_2122110154.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public UserController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
                return BadRequest(new { message = "Username already exists" });

            user.Password = PasswordHelper.HashPassword(user.Password); // 👈 Mã hóa mật khẩu
            user.CreatedAt = DateTime.Now;


            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully", user });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            var hashedPassword = PasswordHelper.HashPassword(login.Password); // 👈 Hash trước khi so sánh

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == login.Username && u.Password == hashedPassword);

            if (user == null)
                return Unauthorized(new { message = "Invalid username or password" });

            // Rút gọn phần token...
            var token = JwtHelper.GenerateToken(
                user,
                _configuration["JwtSettings:SecretKey"],
                _configuration["JwtSettings:Issuer"],
                _configuration["JwtSettings:Audience"],
                int.Parse(_configuration["JwtSettings:ExpiryMinutes"])
            );

            return Ok(new { token, user });
        }



        // GET: api/User
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }
        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully" });
        }
        // PUT: api/User/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            // Cập nhật thông tin người dùng
            user.Name = updatedUser.Name;
            user.Username = updatedUser.Username;
            user.Email = updatedUser.Email;
            user.Phone = updatedUser.Phone;
            user.Address = updatedUser.Address;
            user.Gender = updatedUser.Gender;

            // Nếu có mật khẩu mới thì mã hóa và cập nhật
            if (!string.IsNullOrEmpty(updatedUser.Password))
            {
                user.Password = PasswordHelper.HashPassword(updatedUser.Password);
            }

           

            await _context.SaveChangesAsync();
            return Ok(new { message = "User updated successfully", user });
        }
        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(user);
        }


    }
}
