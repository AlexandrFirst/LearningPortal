using idz.Dtos.Link;

namespace idz.Dtos.Tabs
{
    public class TabInfoDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<LinkDto> Links { get; set; }
        public int Order { get; set; }
    }
}
