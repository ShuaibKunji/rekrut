using Rekrut.Models.Database.System;

namespace Rekrut.Models.Database.Business;

public partial class Applicant
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public string? FullName { get; set; }

    public string? PhoneNumber { get; set; }

    public virtual ICollection<JobApplication> JobApplications { get; } = new List<JobApplication>();

    public virtual User User { get; set; } = null!;
}
