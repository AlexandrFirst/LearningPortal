using idz.DL.Models;

namespace idz.Dtos.Link
{
    public class LinkDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public LinkType ContentType { get; set; }
        public string ResourceId { get; set; }
        public int Order { get; set; }
        public string Metadata { get; set; }
    }
}
