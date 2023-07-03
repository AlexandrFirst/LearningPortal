using idz.Dtos.Mail;
using idz.ReadModels;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace idz.Services
{
    public class EmailService: IEmailService
    {
        private readonly EmailOption emailOption;

        public EmailService(IOptions<EmailOption> emailOption)
        {
            this.emailOption = emailOption.Value;
        }

        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(emailOption.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();

            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();

            if (environment == "Development")
            {
                smtp.Connect(emailOption.Host);
            }
            else if (environment == "Production")
            {
                smtp.Connect(emailOption.Host, emailOption.Port, SecureSocketOptions.StartTls);
                smtp.Authenticate(emailOption.Mail, emailOption.Password);
            }
            else 
            {
                throw new Exception("Unknown stage config");
            }
            
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}
