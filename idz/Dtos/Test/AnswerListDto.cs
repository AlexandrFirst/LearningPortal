using System.Collections.Generic;

namespace idz.Dtos.Test
{
    public class AnswerListItem
    {
        public int QuestionId { get; set; }
        public string Answear { get; set; } // ”бирать зап€тые, добавл€ть все ответы через зап€тую
    }

    public class AnswerListDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Group { get; set; }

        public int TestId { get; set; }
        public List<AnswerListItem> Answears { get; set; } 
    }
}