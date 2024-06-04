package org.sanadlite.courseenrollmentservice.feign.courseservice;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseUpdateDto {
    Integer enrollmentsNumber;
}
