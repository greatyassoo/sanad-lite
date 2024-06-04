package com.sanadlite.courseservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseUpdateReqDto {
    private Integer maxCapacity;

    private Date endDate;

    private String name;

    private String description;

    private String category;

    private Integer enrollmentsNumber;
}
