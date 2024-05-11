package com.sanadlite.courseservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "course_content")
public class CourseContent {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "course_content_id_seq")
    private Long id;

    private String title;
    private String path;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
}
