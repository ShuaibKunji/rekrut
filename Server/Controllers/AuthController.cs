using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rekrut.Abstraction;
using Rekrut.Models.ClientModels;
using Rekrut.Models.Database.System;

namespace Rekrut.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthProvider _authProvider;

        public AuthController(IAuthProvider provider)
        {
            _authProvider = provider;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult<bool>> Register(RegistrationRequest request)
        {
            return Ok(await _authProvider.Register(request));
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
        {
            return Ok(await _authProvider.Login(request));
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<ActionResult<AuthResponse>> RefreshAccessToken(string refreshToken)
        {
            return Ok(await _authProvider.RefreshAccessToken(refreshToken));
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<List<string?>>> GetUserNames()
        {
            return Ok(await _authProvider.GetUserNames());
        }
    }
}
