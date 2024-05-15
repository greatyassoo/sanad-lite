package com.sanadlite.courseservice.controller;

import com.sanadlite.courseservice.dto.request.CourseContentDto;
import com.sanadlite.courseservice.dto.response.CourseContentResDto;
import com.sanadlite.courseservice.service.CourseContentService;
import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@Log
@RequestMapping("/api/v1")
public class CourseContentController {
    private final CourseContentService courseContentService;

    @PostMapping("/courses/{courseId}/content")
    public ResponseEntity<CourseContentResDto> addContent(
            @PathVariable Long courseId,
            @RequestBody CourseContentDto courseContentDto) {
        CourseContentResDto CourseContentResDto = courseContentService.addContentToCourse(courseId, courseContentDto);
        if(CourseContentResDto == null) return ResponseEntity.notFound().build();
        return  new ResponseEntity<>(CourseContentResDto, HttpStatus.CREATED);
    }

    @GetMapping("/courses/{courseId}/content")
    public ResponseEntity<Page<CourseContentResDto>> getAllCourseContents(
            @PathVariable Long courseId,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(required = false) Boolean isPublished,
            Pageable pageable) {
        Page<CourseContentResDto> courseContentResDto = isPublished == null ?
                courseContentService.getCourseContent(courseId, search,null,  pageable):
                courseContentService.getCourseContent(courseId, search, isPublished,  pageable);
        if(courseContentResDto == null) return ResponseEntity.notFound().build();
        return new ResponseEntity<>(courseContentResDto, HttpStatus.OK);
    }

    @PatchMapping("content/{contentId}/publish")
    public ResponseEntity<CourseContentResDto> publishContent(@PathVariable Long contentId) {
        CourseContentResDto courseContentResDto = courseContentService.publishContent(contentId);
        if(courseContentResDto == null) return ResponseEntity.notFound().build();
        return  new ResponseEntity<>(courseContentResDto, HttpStatus.OK);
    }
}
