package com.sanadlite.courseservice.feign.reviewservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponseDto {
    private Long id;
    private Long courseId;
    private Long studentId;
    private Double rating;
    private String review;
}
