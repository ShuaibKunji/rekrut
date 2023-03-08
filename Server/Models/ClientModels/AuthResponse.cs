namespace Rekrut.Models.ClientModels
{
    public class AuthResponse
    {
        public AuthResponse()
        {
            FeatureCodes = new List<string?>();
        }

        public bool AuthenticationSuccess { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public List<string?> FeatureCodes { get; set; }
    }
}
