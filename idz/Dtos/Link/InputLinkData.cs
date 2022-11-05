using idz.DL.Models;

namespace idz.Dtos.Link
{
    public class InputLinkData
    {
        public string Src { get; set; }
        public string Description { get; set; }
        public LinkType LinkType { get; set; }
        public IFormFile FileToUpload { get; set; }
    }
}
