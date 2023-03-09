using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Rekrut.Abstraction;
using Rekrut.Models.ClientModels;
using Rekrut.Models.Database;
using Rekrut.Models.Database.Business;
using Rekrut.Models.Database.System;
using Rekrut.Models.DTO;

namespace Rekrut.Implementation
{
    public class AccountProvider : IAccountProvider
    {
        private readonly RekrutContext _dbcontext;
        private readonly IMapper _mapper;

        public AccountProvider(RekrutContext dbcontext, IMapper mapper)
        {
            _dbcontext = dbcontext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ApplicantDTO>> GetAllApplicants()
        {
            var result = new List<ApplicantDTO>();
            try
            {
                var allapplicants = await _dbcontext.Applicants
                    .Include(a => a.User)
                    .ToListAsync();
                result = _mapper.Map<List<ApplicantDTO>>(allapplicants);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return result;
        }

        public async Task<bool> IsAlreadyRegistered(string email)
        {
            var result = false;
            try
            {
                var account = await _dbcontext.Users.FirstOrDefaultAsync(x => x.Email == email);
                result = account != null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return result;
        }

        public async Task<bool> IsUserNameTaken(string userName)
        {
            var result = false;
            try
            {
                var account = await _dbcontext.Users.FirstOrDefaultAsync(x => x.UserName == userName);
                result = account != null;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return result;
        }

        public async Task<bool> RegisterNewApplicant(RegistrationForm registrationForm)
        {
            var result = false;
            try
            {
                var newUser = await RegisterUser(registrationForm);
                if (newUser!=null)
                {
                    var newApplicaant = new Applicant()
                    {
                        FullName = registrationForm.FullName,
                        UserId = newUser.Id,
                        PhoneNumber = registrationForm.PhoneNumber,
                    };
                    await _dbcontext.Applicants.AddAsync(newApplicaant);
                    result = await _dbcontext.SaveChangesAsync()>0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return result;
        }

        private async Task<User?> RegisterUser(RegistrationForm registrationForm)
        {
            var profile = await _dbcontext.Profiles
                    .FirstOrDefaultAsync(p => p.Code == registrationForm.ProfileCode);
            if (profile != null)
            {
                var newUser = new User()
                {
                    UserName = registrationForm.UserName?.ToLower(),
                    Email = registrationForm.Email?.ToLower(),
                    ProfileId = profile.Id,
                };
                var _hasher = new PasswordHasher<User>();
                newUser.PasswordHash = _hasher.HashPassword(newUser, registrationForm.Password);
                _dbcontext.Users.Add(newUser);
                if (await _dbcontext.SaveChangesAsync() > 0)
                    return newUser;
            }
            return null;
        }
    }
}
