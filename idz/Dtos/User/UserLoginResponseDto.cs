using idz.DL.Models;

namespace idz.Dtos.User
{
    public class UserLoginResponseDto
    {
        public string Name { get; set; }
        public string Suname { get; set; }
        public UserRole UserRole
        {
            get; set;
        }
    }
}
