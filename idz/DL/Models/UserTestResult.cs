using System.ComponentModel.DataAnnotations.Schema;

namespace idz.DL.Models
{
    public class UserTestResult
    {
        public int Id { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey(nameof(Test))]
        public int TestId { get; set; }
        public virtual Test Test { get; set; }

        public string Result { get; set; }
        public DateTime TestTime { get; set; }
    }
}
