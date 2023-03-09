using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Rekrut.Abstraction;
using Rekrut.Models.ClientModels;
using Rekrut.Models.Database;
using Rekrut.Models.Database.System;
using Rekrut.Models.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Rekrut.Implementation
{
    public class AuthProvider : IAuthProvider
    {
        private readonly RekrutContext _dbcontext;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthProvider(RekrutContext context, IConfiguration configuration, IMapper mapper) 
        {
            _dbcontext = context;
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<AuthResponse> Login(LoginRequest request)
        {
            var result = new AuthResponse()
            {
                AuthenticationSuccess = false,
            };
            try
            {
                var user = await _dbcontext.Users
                    .Include(u => u.Applicant)
                    .Include(u => u.Recruiter)
                    .Include(u => u.Profile)
                    .FirstOrDefaultAsync(u => u.Email == request.Login.ToLower() || u.UserName == request.Login.ToLower());
                if (user != null) 
                {
                    var _hasher = new PasswordHasher<User>();
                    result.AuthenticationSuccess = _hasher.VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Success;
                    if(result.AuthenticationSuccess)
                    {
                        var accessFeatures = await _dbcontext.ProfileFeatureMaps
                            .Where(p => p.ProfileId == user.ProfileId)
                            .Select(p => p.Feature).ToListAsync();
                        result.AccessToken = GenerateToken(user, true);
                        result.RefreshToken = GenerateToken(user, false);
                        result.FeatureCodes = _mapper.Map<List<FeatureDTO>>(accessFeatures);
                        result.Name = user.Applicant != null ? user.Applicant?.FullName : user.Recruiter?.FullName;
                        result.Profile = _mapper.Map<ProfileDTO>(user.Profile);
                    }
                }
            }
            catch(Exception ex) 
            {
                Console.WriteLine(ex);
            }
            return result;
        }

        public async Task<AuthResponse> RefreshAccessToken(string refreshToken)
        {
            var result = new AuthResponse()
            {
                AuthenticationSuccess = false,
            };
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = _configuration["Jwt:RefreshKey"];
                if (!string.IsNullOrEmpty(key))
                {
                    tokenHandler.ValidateToken(refreshToken, new TokenValidationParameters
                    {
                        ValidIssuer = _configuration["Jwt:Issuer"],
                        ValidAudience = _configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = false,
                        ValidateIssuerSigningKey = true
                    }, out SecurityToken validatedToken);

                    var jwtToken = (JwtSecurityToken)validatedToken;
                    if(jwtToken.ValidTo > DateTime.UtcNow) 
                    {
                        var userName = jwtToken.Claims.First(c => c.Type == JwtRegisteredClaimNames.UniqueName).Value;
                        var user = await _dbcontext.Users.FirstOrDefaultAsync(u => u.UserName == userName);
                        if (user != null)
                        {
                            var accessFeatures = await _dbcontext.ProfileFeatureMaps
                            .Where(p => p.ProfileId == user.ProfileId)
                            .Select(p => p.Feature).ToListAsync();
                            result = new AuthResponse()
                            {
                                AuthenticationSuccess = true,
                                AccessToken = GenerateToken(user, true),
                                RefreshToken = refreshToken,
                                FeatureCodes = _mapper.Map<List<FeatureDTO>>(accessFeatures)
                        };
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return result;
        }

        private string GenerateToken(User user, bool isAccess)
        {
            var stringToken = "";
            DateTime lifeTime;
            string? secretKey;
            if (isAccess)
            {
                secretKey = _configuration["Jwt:AccessKey"];
                lifeTime = DateTime.UtcNow.AddMinutes(Convert.ToInt16(_configuration["Jwt:AccessLifeTime"]));
            }
            else
            {
                secretKey = _configuration["Jwt:RefreshKey"];
                lifeTime = DateTime.UtcNow.AddMinutes(Convert.ToInt16(_configuration["Jwt:RefreshLifeTime"]));
            }
            if (secretKey != null && user.UserName != null && user.Email != null) 
            {
                var key = Encoding.ASCII.GetBytes(secretKey);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                                new Claim("Id", Guid.NewGuid().ToString()),
                                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                             }),
                    Expires = lifeTime,
                    Issuer = _configuration["Jwt:Issuer"],
                    Audience = _configuration["Jwt:Audience"],
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                stringToken = tokenHandler.WriteToken(token);
            }
            return stringToken;
        }
    }
}
