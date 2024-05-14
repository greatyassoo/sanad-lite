package com.sanadlite.courseservice.dto.response;


import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseResDto {
    private Long id;

    private String name;

    private String description;

    private String category;

    private Double rating;

    private Integer ratingsCount;

    private Integer enrollmentsNumber;

    private Integer maxCapacity;

    private Date endDate;

    private String instructorId;
}
