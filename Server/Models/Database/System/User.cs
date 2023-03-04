namespace Rekrut.Models.Database.System;

public partial class User
{
    public long Id { get; set; }

    public string? UserName { get; set; }

    public string? Email { get; set; }

    public string? PasswordHash { get; set; }
}
