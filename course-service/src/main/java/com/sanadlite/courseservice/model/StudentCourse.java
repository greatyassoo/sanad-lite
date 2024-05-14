package com.sanadlite.courseservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "student_courses")
public class StudentCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "student_course_id_seq")
    private Long id;

    @Column(name = "student_id")
    private String studentId;

    @Column(name = "course_id")
    private String courseId;
}
