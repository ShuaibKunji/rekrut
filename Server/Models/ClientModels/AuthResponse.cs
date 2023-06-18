using Rekrut.Models.DTO;

namespace Rekrut.Models.ClientModels
{
    public class AuthResponse
    {
        public AuthResponse()
        {
            FeatureCodes = new List<FeatureDTO>();
            Profile = new ProfileDTO();
            UserDetails = new UserDetails();
        }

        public bool AuthenticationSuccess { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public UserDetails UserDetails { get; set; }
        public ProfileDTO Profile { get; set; }
        public List<FeatureDTO> FeatureCodes { get; set; }
    }

    public class UserDetails
    {
        public long UserId { get; set; }
        public string? UserName { get; set; }
        public string? FullName { get; set; }
        public string? UserEmail { get; set; }
    }
}
