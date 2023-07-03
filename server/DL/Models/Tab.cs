namespace idz.DL.Models
{
    public class Tab
    {
        public Tab()
        {
            Links = new List<Link>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<Link> Links { get; set; }
        public virtual List<Test> Tests { get; set; }
        public int Order { get; set; }
    }
}
