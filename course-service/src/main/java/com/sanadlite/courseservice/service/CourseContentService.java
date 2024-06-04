package com.sanadlite.courseservice.service;

import com.sanadlite.courseservice.dto.request.CourseContentDto;
import com.sanadlite.courseservice.dto.response.CourseContentResDto;
import com.sanadlite.courseservice.model.Course;
import com.sanadlite.courseservice.model.CourseContent;
import com.sanadlite.courseservice.repository.CourseContentRepository;
import com.sanadlite.courseservice.repository.CourseRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Log
@Service
@AllArgsConstructor
public class CourseContentService {
    private final CourseContentRepository courseContentRepository;
    private final CourseRepository courseRepository;
    private final ModelMapper modelMapper;

    public CourseContentResDto addContentToCourse(Long courseId, CourseContentDto courseContentDto) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course != null){
            CourseContent courseContent = courseContentRepository.save(
                    CourseContent.builder()
                            .course(course)
                            .title(courseContentDto.getTitle())
                            .path(courseContentDto.getPath())
                            .isPublished(false)
                            .build());

            return modelMapper.map(courseContent, CourseContentResDto.class);
        } else return null;
    }
    public Page<CourseContentResDto> getCourseContent(Long courseId, String search, Boolean isPublished, Pageable pageable) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course != null){
            Page<CourseContent> courseContents;
            if(isPublished!=null){
                courseContents = courseContentRepository.findCourseContentByCourseAndTitleContainsIgnoreCaseAndIsPublished(course, search, isPublished, pageable);
            }else courseContents = courseContentRepository.findCourseContentByCourseAndTitleContainsIgnoreCase(course, search, pageable);
            return courseContents.map(courseContent->
                    new CourseContentResDto(courseContent.getId(), courseContent.getTitle(), courseContent.getPath(), courseContent.getIsPublished()));
        }else return null;
    }
    public CourseContentResDto publishContent(Long contentId){
        Optional<CourseContent> courseContent = courseContentRepository.findById(contentId);
        if(courseContent.isPresent()){
            CourseContent courseContent1 = courseContent.get();
            courseContent1.setIsPublished(true);
            courseContent1 = courseContentRepository.save(courseContent1);
            return modelMapper.map(courseContent1, CourseContentResDto.class);
        } else return null;
    }
}
