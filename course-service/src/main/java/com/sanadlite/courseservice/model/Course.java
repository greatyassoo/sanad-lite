package com.sanadlite.courseservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "courses_id_seq")
    private Long id;

    private String name;

    private String description;

    private String category;

    private Double rating;

    @Column(name = "ratings_count")
    private Integer ratingsCount;

    @Column(name = "enrollments_number")
    private Integer enrollmentsNumber;

    @Column(name = "max_capacity")
    private Integer maxCapacity;

    @Column(name = "is_published")
    private Boolean isPublished = false;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "instructor_id")
    private Long instructorId;

}
