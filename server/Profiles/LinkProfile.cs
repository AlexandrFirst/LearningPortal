using AutoMapper;
using idz.DL.Models;
using idz.Dtos.Link;

namespace idz.Profiles
{
    public class LinkProfile: Profile
    {
        public LinkProfile()
        {
            CreateMap<LinkDto, Link>().ReverseMap();
        }
    }
}
