package com.sanadlite.courseservice.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

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
    private String instructorId;

    @OneToMany(mappedBy = "course",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    List<CourseContent> courseContent;
}
