package com.sanadlite.courseservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseContentResDto {
    private Long id;
    private String title;
    private String path;
    private Boolean isPublished;
}
