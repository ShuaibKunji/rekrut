using Rekrut.Models.ClientModels;

namespace Rekrut.Abstraction
{
    public interface IAuthProvider
    {
        Task<bool> Register(RegistrationRequest request);
        Task<AuthResponse> Login(LoginRequest request);
        Task<AuthResponse> RefreshAccessToken(string refreshToken);
        Task<List<string?>> GetUserNames();
    }
}
