﻿using Rekrut.Models.ClientModels;

namespace Rekrut.Abstraction
{
    public interface IAuthProvider
    {
        Task<AuthResponse> Login(LoginRequest request);
        Task<AuthResponse> RefreshAccessToken(string refreshToken);
    }
}
