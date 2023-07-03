using AutoMapper;
using idz.DL.Models;
using idz.Dtos.Tabs;

namespace idz.Profiles
{
    public class TabProfile: Profile
    {
        public TabProfile()
        {
            CreateMap<TabInfoDto, Tab>().ReverseMap();
            CreateMap<TabToUpdate, Tab>().ForMember(x => x.Links, act => act.Ignore());
        }
    }
}
