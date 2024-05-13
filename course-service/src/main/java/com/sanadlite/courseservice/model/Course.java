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
    @SequenceGenerator(name = "courses_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "courses_seq")
    private Long id;

    private String name;

    private String description;

    private String category;

    private Double rating = 0.0;

    @Column(name = "ratings_count")
    private Integer ratingsCount = 0;

    @Column(name = "enrollments_number")
    private Integer enrollmentsNumber = 0;

    @Column(name = "max_capacity")
    private Integer maxCapacity;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "instructor_id")
    private Long instructorId;
}
