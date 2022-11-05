using AutoMapper;
using idz.DL;
using idz.DL.Models;
using idz.Dtos.User;
using idz.Services;
using idz.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace idz.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext context;
        private readonly PasswordHelper passwordHelper;
        private readonly IMapper mapper;
        private readonly IEmailService emailService;

        public UserController(DataContext context,
            PasswordHelper passwordHelper, IMapper mapper,
            IEmailService emailService)
        {
            this.context = context;
            this.passwordHelper = passwordHelper;
            this.mapper = mapper;
            this.emailService = emailService;
        }


        [HttpGet("confirm")]
        public async Task<IActionResult> ConfirmEmail(string confirmationToken)
        {
            Guid userToken;
            var isTokenParsed = Guid.TryParse(confirmationToken, out userToken);
            if (isTokenParsed)
            {
                var pendingUser = await context.Users.FirstOrDefaultAsync(x => x.ConfirmationToken == userToken && x.IsPending == true);
                if (pendingUser == null)
                {
                    return NotFound(new { Message = "User not found" });
                }

                if (pendingUser.ExperationTime > DateTime.Now)
                {
                    pendingUser.IsPending = false;
                    await context.SaveChangesAsync();
                }
                else
                {
                    return BadRequest(new { Message = "Token is expired" });
                }

            }
            else
            {
                return BadRequest(new { Message = "Invalid token format" });
            }
            return Ok();
        }


        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] UserLoginRequestDto userLogin)
        {
            var dbUser = await context.Users.FirstOrDefaultAsync(x => x.Email.Equals(userLogin.Email) && x.IsPending == false);
            if (dbUser == null)
            {
                return BadRequest(new { Message = "Wrong password or email" });
            }

            var inputPassword = passwordHelper.Encrypt(userLogin.Password);
            var storedPassword = dbUser.Password;
            if (storedPassword != inputPassword)
            {
                return BadRequest(new { Message = "Wrong password or email" });
            }

            var claimsIdentity = new ClaimsIdentity(new[]
           {
                new Claim(ClaimTypes.Name, dbUser.Name),
                new Claim(ClaimTypes.Surname, dbUser.Surname),
                new Claim(ClaimTypes.Role, dbUser.UserRole.ToString()),
                new Claim(ClaimTypes.Email, dbUser.Email),
            }, "Cookies");

            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
            await Request.HttpContext.SignInAsync("Cookies", claimsPrincipal);

            var userInfo = new UserLoginResponseDto()
            {
                Name = dbUser.Name,
                Suname = dbUser.Surname,
                UserRole = dbUser.UserRole
            };

            return Ok(new { Message = "You are logged in" });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return NoContent();
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegisterDto userRegisterDto)
        {
            try
            {
                var userToRegister = mapper.Map<User>(userRegisterDto);
                var isMailvalid = checkMailAndDomain(userToRegister.Email);
                if (isMailvalid)
                {
                    Guid confirmToken = Guid.NewGuid();

                    await emailService.SendEmailAsync(new Dtos.Mail.MailRequest()
                    {
                        Body = $"<p>{confirmToken.ToString()}</p>",
                        Subject = "Mail confirmation",
                        ToEmail = userToRegister.Email,
                    });

                    userToRegister.IsPending = true;
                    userToRegister.UserRole = UserRole.Basic;
                    userToRegister.ExperationTime = DateTime.Now.AddHours(4);
                    userToRegister.ConfirmationToken = confirmToken;
                    userToRegister.Password = passwordHelper.Encrypt(userToRegister.Password);

                    await context.AddAsync(userToRegister);
                    await context.SaveChangesAsync();

                    return Ok(new { Message = "User is pending email" });
                }
                else
                {
                    return BadRequest(new { Message = "invalid request" });
                }
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = "error while executing resquest" });
            }

        }

        private bool checkMailAndDomain(string mail)
        {
            string validEmailPattern = @"^(?!\.)(""([^""\r\\]|\\[""\r\\])*""|"
            + @"([-a-z0-9!#$%&'*+/=?^_`{|}~]|(?<!\.)\.)*)(?<!\.)"
            + @"@(?<domain>[a-z0-9][\w\.-]*[a-z0-9])\.[a-z][a-z\.]*[a-z]$";

            Regex expression = new Regex(validEmailPattern);

            Match match = expression.Match(mail);
            if (match.Success)
            {
                var domain = match.Groups["domain"].Value;
                return domain.Equals("nure");
            }
            else
            {
                return false;
            }
        }

    }
}
