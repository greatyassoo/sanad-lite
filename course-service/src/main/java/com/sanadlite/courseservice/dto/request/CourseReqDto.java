package com.sanadlite.courseservice.dto.request;

import com.sanadlite.courseservice.utils.Category;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseReqDto {
    @NotEmpty(message = "name is required")
    @Size(min = 3,max = 50, message = "name length must be between 3 and 50 characters")
    private String name;

    @NotEmpty(message = "name is required")
    @Size(max = 200, message = "description length must not greater than 200 characters")
    private String description;

    @NotNull(message = "category is required")
    private Category category;

    @NotNull(message = "maxCapacity is required")
    private Integer maxCapacity;

//    @NotNull(message = "endDate is required")
    @Future(message = "endDate must be in the future")
    private Date endDate;

    private String instructorId;
}
