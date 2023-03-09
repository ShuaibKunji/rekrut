using Rekrut.Models.DTO;

namespace Rekrut.Models.ClientModels
{
    public class AuthResponse
    {
        public AuthResponse()
        {
            FeatureCodes = new List<FeatureDTO>();
            Profile = new ProfileDTO();
        }

        public bool AuthenticationSuccess { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public string? Name { get; set; }
        public ProfileDTO Profile { get; set; }
        public List<FeatureDTO> FeatureCodes { get; set; }
    }
}
