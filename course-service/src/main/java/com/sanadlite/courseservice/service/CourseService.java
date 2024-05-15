package com.sanadlite.courseservice.service;

import com.sanadlite.courseservice.dto.request.CourseReqDto;
import com.sanadlite.courseservice.dto.request.CourseUpdateReqDto;
import com.sanadlite.courseservice.dto.response.CourseResDto;
import com.sanadlite.courseservice.feign.reviewservice.ReviewInterface;
import com.sanadlite.courseservice.feign.reviewservice.dto.ReviewRequestDto;
import com.sanadlite.courseservice.feign.reviewservice.dto.ReviewResponseDto;
import com.sanadlite.courseservice.mapper.CourseMapper;
import com.sanadlite.courseservice.model.Course;
import com.sanadlite.courseservice.repository.CourseRepository;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.modelmapper.ModelMapper;
import org.modelmapper.config.Configuration;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Log
@Service
@AllArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final ModelMapper modelMapper;
    private final ReviewInterface reviewInterface;

    public Page<Course> getAll(String search, String instructorId, Pageable pageable) {
        return courseRepository.findCoursesCustom(instructorId, search, pageable);
    }

    public Optional<Course> getById(Long id) {
        return courseRepository.findById(id);
    }

    public CourseResDto addCourse(CourseReqDto courseReqDto){
        Course course = courseRepository.save(courseMapper.courseReqDtoToCourse(courseReqDto));
        CourseResDto courseResDto = courseMapper.courseToCourseResDto(course);
        return courseResDto;
    }

    public Boolean deleteCourseById(Long id) {
        Optional<Course> course = courseRepository.findById(id);
        if(course.isPresent()){
            courseRepository.deleteById(id);
            reviewInterface.deleteReviewByCourseId(id);
            return true;
        } else return false;
    }

    public Course updateCourse(Long id, CourseUpdateReqDto courseUpdateReqDto) {
        Course course = courseRepository.findById(id).orElse(null);
        if(course != null){
            modelMapper.map(courseUpdateReqDto, course);
            courseRepository.save(course);
        }
        return course;
    }

    public ReviewResponseDto createReviewToCourse(Long courseId, ReviewRequestDto reviewRequestDto){
        Course course = courseRepository.findById(courseId).orElse(null);
        if(course != null){
            // Update rating logic
            double totalRating = course.getRating() * course.getRatingsCount();
            double newRating = (totalRating + reviewRequestDto.getRating()) / (course.getRatingsCount() + 1);
            // Update course entity
            course.setRating(newRating);
            course.setRatingsCount(course.getRatingsCount() + 1);
            courseRepository.save(course);
            return reviewInterface.createReview(reviewRequestDto).getBody();
        }
        return null;
    }

    public List<ReviewResponseDto> getAllCourseReviews(Long courseId, Pageable pageable) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if(course != null){
            return reviewInterface.getReviewsByCourseId(courseId).getBody();
        }
        return null;
    }
}
