namespace Rekrut.Models.ClientModels
{
    public class LoginRequest
    {
        public LoginRequest() {
            Login = "";
            Password = "";
        }
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
