using Microsoft.AspNetCore.Mvc;
using Rekrut.Abstraction;
using Rekrut.Models.ClientModels;

namespace Rekrut.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthProvider _authProvider;

        public AuthController(IAuthProvider provider)
        {
            _authProvider = provider;
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
        {
            return Ok(await _authProvider.Login(request));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<AuthResponse>> RefreshAccessToken(string refreshToken)
        {
            return Ok(await _authProvider.RefreshAccessToken(refreshToken));
        }
    }
}
