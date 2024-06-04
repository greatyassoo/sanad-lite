package org.sanadlite.courseenrollmentservice.feign.courseservice;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "course-service", url = "${course.service.url}", dismiss404 = true)
public interface CourseInterface {
    @GetMapping("{courseId}")
    ResponseEntity<CourseResponseDto> getCourseById(@PathVariable("courseId") Long courseId);

    @PatchMapping("/{courseId}")
    ResponseEntity<?> updateCourse(@PathVariable("courseId") Long courseId, @RequestBody CourseUpdateDto courseUpdateDto);
}
