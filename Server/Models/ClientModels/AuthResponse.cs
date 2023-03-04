namespace Rekrut.Models.ClientModels
{
    public class AuthResponse
    {
        public bool AuthenticationSuccess { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }
}
