using AutoMapper;
using Rekrut.Models.Database.Business;
using Rekrut.Models.DTO;

namespace Rekrut.Helpers
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig() 
        {
            CreateMap<Applicant, ApplicantDTO>()
                .ForMember(destination => destination.Id, option => option.MapFrom(source => source.Id))
                .ForMember(destination => destination.FullName, option => option.MapFrom(source => source.FullName))
                .ForMember(destination => destination.PhoneNumber, option => option.MapFrom(source => source.PhoneNumber))
                .ForMember(destination => destination.UserName, option => option.MapFrom(source => source.User.UserName))
                .ForMember(destination => destination.Email, option => option.MapFrom(source => source.User.Email));
        }
    }
}
