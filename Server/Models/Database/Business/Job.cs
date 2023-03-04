namespace Rekrut.Models.Database.Business;

public partial class Job
{
    public long Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<JobApplication> JobApplications { get; } = new List<JobApplication>();
}
