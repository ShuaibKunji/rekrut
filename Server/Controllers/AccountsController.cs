using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Rekrut.Abstraction;
using Rekrut.Models.ClientModels;
using Rekrut.Models.DTO;

namespace Rekrut.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountProvider _accountProvider;

        public AccountsController(IAccountProvider provider) 
        {
            _accountProvider = provider;
        }

        [HttpPost("[action]")]
        [AllowAnonymous]
        public async Task<ActionResult<bool>> RegisterNewApplicant(RegistrationForm registrationForm)
        {
            return Ok(await _accountProvider.RegisterNewApplicant(registrationForm));
        }

        [HttpGet("[action]")]
        [AllowAnonymous]
        public async Task<ActionResult<bool>> IsUserNameTaken(string userName)
        {
            return Ok(await _accountProvider.IsUserNameTaken(userName));
        }

        [HttpGet("[action]")]
        [AllowAnonymous]
        public async Task<ActionResult<bool>> IsAlreadyRegistered(string email)
        {
            return Ok(await _accountProvider.IsAlreadyRegistered(email));
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<ApplicantDTO>>> GetAllApplicants()
        {
            return Ok(await _accountProvider.GetAllApplicants());
        }
    }
}
