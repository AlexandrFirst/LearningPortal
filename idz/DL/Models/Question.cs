namespace idz.DL.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string AnswearsList { get; set; }
        public string PossibleAnswears { get; set; }
        public virtual Test Test { get; set; }
    }
}
