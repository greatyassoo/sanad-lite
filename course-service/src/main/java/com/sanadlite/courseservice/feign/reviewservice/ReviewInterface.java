package com.sanadlite.courseservice.feign.reviewservice;

import com.sanadlite.courseservice.feign.reviewservice.dto.ReviewRequestDto;
import com.sanadlite.courseservice.feign.reviewservice.dto.ReviewResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "review-service", url = "${review.service.url}", dismiss404 = true)
public interface ReviewInterface {

    @GetMapping()
    ResponseEntity<List<ReviewResponseDto>> getReviewsByCourseId(@RequestParam("courseId") Long courseId);

    @PostMapping()
    ResponseEntity<ReviewResponseDto> createReview(ReviewRequestDto reviewRequestDto);

    @DeleteMapping()
    ResponseEntity<String> deleteReviewByCourseId(@RequestParam("courseId") Long courseId);
}
