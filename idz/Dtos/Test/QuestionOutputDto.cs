using System.Collections.Generic;

namespace idz.Dtos.Test
{
    public class QuestionOutputDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public List<string> PossibleAnswears { get; set; }
    }
}