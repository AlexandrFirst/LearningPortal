namespace idz.Dtos.Tabs
{
    public class TabToUpdate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<int> Links { get; set; }
        public int Order { get; set; }
    }
}
