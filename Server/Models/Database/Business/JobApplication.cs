namespace Rekrut.Models.Database.Business;

public partial class JobApplication
{
    public long Id { get; set; }

    public long JobId { get; set; }

    public long? ApplicantId { get; set; }

    public string? Resume { get; set; }

    public string? CoverLetter { get; set; }

    public virtual Applicant? Applicant { get; set; }

    public virtual Job Job { get; set; } = null!;
}
