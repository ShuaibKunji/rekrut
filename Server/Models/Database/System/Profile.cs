namespace Rekrut.Models.Database.System;

public partial class Profile
{
    public long Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Code { get; set; }

    public virtual ICollection<ProfileFeatureMap> ProfileFeatureMaps { get; } = new List<ProfileFeatureMap>();

    public virtual ICollection<User> Users { get; } = new List<User>();
}
