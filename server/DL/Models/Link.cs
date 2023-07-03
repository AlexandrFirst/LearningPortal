namespace idz.DL.Models
{
    public enum LinkType { Link, Video, Pdf}

    public class Link
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public LinkType ContentType { get; set; }
        public int Order { get; set; }
        public string ResourceId { get; set; }
        public bool IsUsed { get; set; } = false;
        public virtual Tab Tab { get; set; }
        public string Metadata { get; set; }
    }
}
