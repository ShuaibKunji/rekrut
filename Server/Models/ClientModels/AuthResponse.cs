namespace Rekrut.Models.ClientModels
{
    public class AuthResponse
    {
        public AuthResponse()
        {
            Features = new List<string?>();
        }

        public bool AuthenticationSuccess { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public List<string?> Features { get; set; }
    }
}
