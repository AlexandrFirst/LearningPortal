﻿using AutoMapper;
using idz.DL.Models;
using idz.Dtos.Test;

namespace idz.Profiles
{
    public class TestProfile: Profile
    {
        public TestProfile()
        {
            CreateMap<Question, QuestionInputDto>()
                   .ForMember(q_dto => q_dto.AnswearsList,
                              memberOption => memberOption.MapFrom(q => q.AnswearsList
                                                                         .Split(',', System.StringSplitOptions.RemoveEmptyEntries)
                                                                         .ToList<string>()))
                   .ForMember(q_dto => q_dto.PossibleAnswears,
                              memberOption => memberOption.MapFrom(q => q.PossibleAnswears
                                                                         .Split(',', System.StringSplitOptions.RemoveEmptyEntries)
                                                                         .ToList<string>()));

            CreateMap<QuestionInputDto, Question>()
                    .ForMember(q => q.AnswearsList,
                               memberOption => memberOption.MapFrom(q_dto => string.Join(',', q_dto.AnswearsList)))
                    .ForMember(q => q.PossibleAnswears,
                               memberOption => memberOption.MapFrom(q_dto => string.Join(',', q_dto.PossibleAnswears)));


            CreateMap<Question, QuestionOutputDto>()
                    .ForMember(q_dto => q_dto.PossibleAnswears,
                               memberOption => memberOption.MapFrom(q => q.PossibleAnswears
                                                                        .Split(',', System.StringSplitOptions.RemoveEmptyEntries)
                                                                        .ToList<string>()));


            CreateMap<Test, TestInputDto>();
            CreateMap<TestInputDto, Test>().ForMember(t => t.Id, memeberOptions => memeberOptions.Ignore());

            CreateMap<Test, TestOutputDto>().ReverseMap();
        }
    }
}
