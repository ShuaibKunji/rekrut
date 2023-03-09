using AutoMapper;
using AutoMapper.Configuration.Annotations;
using Rekrut.Models.Database.System;

namespace Rekrut.Models.DTO
{
    [AutoMap(typeof(Feature))]
    public class FeatureDTO
    {
        [SourceMember(nameof(Feature.Code))]
        public string? FeatureCode { get; set; }

        [SourceMember(nameof(Feature.Route))]
        public string? Route { get; set; }
    }
}
