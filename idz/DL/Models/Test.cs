namespace idz.DL.Models
{
    public class Test
    {
        public Test()
        {
            Questions = new List<Question>();
            UserTestResults = new List<UserTestResult>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int TryCount { get; set; }
        public double LowThreshold { get; set; }
        public virtual IList<Question> Questions { get; set; }
        public virtual List<UserTestResult> UserTestResults { get; set; }
        public virtual Tab Tab { get; set; }
    }
}
