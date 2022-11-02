namespace idz.DL.Models
{
    public enum UserRole { Basic = 1, Admin = 2}
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public UserRole UserRole { get; set; }

        public bool IsPending { get; set; }
        public string ConfirmationToken { get; set; }
        public DateTime ExperationTime { get; set; }
    }
}
