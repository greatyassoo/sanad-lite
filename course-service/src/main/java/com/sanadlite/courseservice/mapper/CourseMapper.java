package com.sanadlite.courseservice.mapper;

import com.sanadlite.courseservice.dto.request.CourseReqDto;
import com.sanadlite.courseservice.dto.response.CourseResDto;
import com.sanadlite.courseservice.model.Course;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CourseMapper {
    private ModelMapper modelMapper;

    public CourseResDto courseToCourseResDto(Course course){
        return modelMapper.map(course, CourseResDto.class);
    }

    public Course courseResDtoToCourse(CourseResDto courseResDto){
        return modelMapper.map(courseResDto, Course.class);
    }

    public Course courseReqDtoToCourse(CourseReqDto courseReqDto){
        return modelMapper.map(courseReqDto, Course.class);
    }

}
