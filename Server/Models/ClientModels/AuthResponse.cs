using Rekrut.Models.DTO;

namespace Rekrut.Models.ClientModels
{
    public class AuthResponse
    {
        public AuthResponse()
        {
            FeatureCodes = new List<FeatureDTO>();
        }

        public bool AuthenticationSuccess { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public List<FeatureDTO> FeatureCodes { get; set; }
    }
}
