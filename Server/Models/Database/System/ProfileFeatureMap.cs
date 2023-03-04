namespace Rekrut.Models.Database.System;

public partial class ProfileFeatureMap
{
    public long Id { get; set; }

    public long ProfileId { get; set; }

    public long FeatureId { get; set; }

    public virtual Feature Feature { get; set; } = null!;

    public virtual Profile Profile { get; set; } = null!;
}
