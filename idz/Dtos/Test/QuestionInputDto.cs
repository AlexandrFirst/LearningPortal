using System.Collections.Generic;

namespace idz.Dtos.Test
{
    public class QuestionInputDto
    {
        public string Content { get; set; }
        public List<string> AnswearsList { get; set; }
        public List<string> PossibleAnswears { get; set; }
    }
}