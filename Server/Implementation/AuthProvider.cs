using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Rekrut.Abstraction;
using Rekrut.Models.ClientModels;
using Rekrut.Models.Database;
using Rekrut.Models.Database.System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Rekrut.Implementation
{
    public class AuthProvider : IAuthProvider
    {
        private readonly RekrutContext _dbcontext;
        private readonly PasswordHasher<User> _hasher;
        private readonly IConfiguration _configuration;

        public AuthProvider(RekrutContext context, IConfiguration configuration) 
        {
            _dbcontext = context;
            _hasher = new PasswordHasher<User>();
            _configuration = configuration;
        }

        public async Task<List<string?>> GetUserNames()
        {
            var result = new List<string?>();
            try
            {
                result = await _dbcontext.Users
                    .Select(u => u.UserName)
                    .ToListAsync();
            }
            catch (Exception ex) 
            {
                Console.WriteLine(ex);
            }
            return result;
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
                    .FirstOrDefaultAsync(u => u.Email == request.Login || u.UserName == request.Login);
                if (user != null) 
                {
                    result.AuthenticationSuccess = _hasher.VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Success;
                    if(result.AuthenticationSuccess)
                    {
                        result.AccessToken = GenerateToken(user, true);
                        result.RefreshToken = GenerateToken(user, false);
                        result.Features = await _dbcontext.ProfileFeatureMaps
                            .Where(p => p.ProfileId == user.ProfileId)
                            .Select(p => p.Feature.Name).ToListAsync();
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
                var key = _configuration["Jwt:Key"];
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
                            result = new AuthResponse()
                            {
                                AuthenticationSuccess = true,
                                AccessToken = GenerateToken(user, true),
                                RefreshToken = refreshToken
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

        public async Task<bool> Register(RegistrationRequest request)
        {
            var result = false;
            try
            {
                var newUser = new User()
                {
                    UserName = request.UserName,
                    Email = request.Email,
                    ProfileId = request.ProfileId
                };
                newUser.PasswordHash = _hasher.HashPassword(newUser, request.Password);
                _dbcontext.Users.Add(newUser);
                result = await _dbcontext.SaveChangesAsync() > 0;
            }
            catch(Exception ex) 
            {
                Console.WriteLine(ex);
            }
            return result;
        }

        private string GenerateToken(User user, bool isAccess)
        {
            var stringToken = "";
            var lifeTime = isAccess ?
                DateTime.UtcNow.AddMinutes(Convert.ToInt16(_configuration["Jwt:AccessLifeTime"])) :
                DateTime.UtcNow.AddMinutes(Convert.ToInt16(_configuration["Jwt:RefreshLifeTime"]));
            var secretKey = _configuration["Jwt:Key"];
            if(secretKey != null && user.UserName != null && user.Email != null) 
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
