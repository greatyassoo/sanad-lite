package org.sanadlite.courseenrollmentservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EnrollmentRequestDto {
    private Long courseId;
    private String studentUUID;
}
