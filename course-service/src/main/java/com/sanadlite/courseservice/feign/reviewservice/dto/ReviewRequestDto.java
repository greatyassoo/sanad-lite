package com.sanadlite.courseservice.feign.reviewservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequestDto {
    private Long courseId;
    private String studentUUID;
    private Double rating;
    private String review;
}
