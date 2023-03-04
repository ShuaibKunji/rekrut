using Rekrut.Models.Database.Business;

namespace Rekrut.Models.Database.System;

public partial class User
{
    public long Id { get; set; }

    public string? UserName { get; set; }

    public string? Email { get; set; }

    public string? PasswordHash { get; set; }

    public long ProfileId { get; set; }

    public virtual Applicant? Applicant { get; set; }

    public virtual Profile Profile { get; set; } = null!;

    public virtual Recruiter? Recruiter { get; set; }
}
