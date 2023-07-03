using System.Collections.Generic;

namespace idz.Dtos.Test
{
    public class QuestionInputDto
    {
        public string Content { get; set; } //Заголовок вопроса
        public List<string> AnswearsList { get; set; } // Все ответы
        public List<string> PossibleAnswears { get; set; } // Правильные ответы
    }
}