package org.sanadlite.courseenrollmentservice.feign.courseservice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseResponseDto {
    private Long id;
    private String name;
    private String description;
    private String category;
    private Double rating;
    private Integer ratingsCount;
    private Integer enrollmentsNumber; // TODO: discuss
    private Integer maxCapacity;
    private Date endDate;
    private String instructorId;
}
