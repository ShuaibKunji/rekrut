using Rekrut.Models.Database.System;

namespace Rekrut.Models.Database.Business;

public partial class Recruiter
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public string? FullName { get; set; }

    public string? PhoneNumber { get; set; }

    public virtual User User { get; set; } = null!;
}
