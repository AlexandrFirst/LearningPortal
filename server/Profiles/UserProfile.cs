using AutoMapper;
using idz.DL.Models;
using idz.Dtos.User;

namespace idz.Profiles
{
    public class UserProfile: Profile
    {
        public UserProfile()
        {
            CreateMap<UserRegisterDto, User>();
        }
    }
}
