using System.Collections.Generic;

namespace idz.Dtos.Test
{
    public class TestInputDto
    {
        public int Id { get; set; }
        public int TryCount { get; set; }
        public string Name { get; set; } // Имя теста
        public double LowThreshold { get; set; } // Минимальный проходной процент
        public List<QuestionInputDto> Questions { get; set; }
    }
}