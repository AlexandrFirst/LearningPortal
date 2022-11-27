using System.Collections.Generic;

namespace idz.Dtos.Test
{
    public class TestOutputDto
    {
        public int Id { get; set; }
        public IList<QuestionOutputDto> Questions { get; set; }
    }
}