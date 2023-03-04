namespace Rekrut.Models.Database.System;

public partial class Feature
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<ProfileFeatureMap> ProfileFeatureMaps { get; } = new List<ProfileFeatureMap>();
}
