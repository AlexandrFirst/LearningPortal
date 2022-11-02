using AutoMapper;
using idz.DL;
using idz.DL.Models;
using idz.Dtos.User;
using idz.Services;
using idz.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace idz.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController: ControllerBase
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



        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] UserLoginDto userLogin) 
        {
            return Ok();
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
