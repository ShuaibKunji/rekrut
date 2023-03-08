using Rekrut.Models.ClientModels;
using Rekrut.Models.DTO;

namespace Rekrut.Abstraction
{
    public interface IAccountProvider
    {
        Task<bool> RegisterNewApplicant(RegistrationForm registrationForm);
        Task<bool> IsUserNameTaken(string userName);
        Task<bool> IsAlreadyRegistered(string email);
        Task<IEnumerable<ApplicantDTO>> GetAllApplicants();
    }
}
