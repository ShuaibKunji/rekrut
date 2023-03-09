using AutoMapper;
using AutoMapper.Configuration.Annotations;
using Profile = Rekrut.Models.Database.System.Profile;

namespace Rekrut.Models.DTO
{
    [AutoMap(typeof(Profile))]
    public class ProfileDTO
    {
        [SourceMember(nameof(Profile.Name))]
        public string? ProfileName { get; set; }

        [SourceMember(nameof(Profile.Code))]
        public string? ProfileCode { get; set; }
    }
}
