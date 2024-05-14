package org.sanadlite.courseenrollmentservice.feign.courseservice;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "course-service", url = "${course.service.url}", dismiss404 = true)
public interface CourseInterface {
    @GetMapping("{courseId}")
    ResponseEntity<CourseResponseDto> getCourseById(@PathVariable("courseId") Long courseId);
}
