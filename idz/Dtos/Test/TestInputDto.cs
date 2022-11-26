using System.Collections.Generic;

namespace idz.Dtos.Test
{
    public class TestInputDto
    {
        public int Id { get; set; }
        public int TryCount { get; set; }
        public string Name { get; set; }
        public double LowThreshold { get; set; }
        public List<QuestionInputDto> Questions { get; set; }
    }
}