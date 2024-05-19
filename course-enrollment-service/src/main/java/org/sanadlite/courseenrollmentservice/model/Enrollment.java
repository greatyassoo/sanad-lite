package org.sanadlite.courseenrollmentservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@Entity
public class Enrollment {
    @Id
    @SequenceGenerator(name = "enrollment_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "enrollment_seq")
    private Long id;

    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "student_uuid")
    private String studentUUID;

    private Integer status;

    public Enrollment() {
        this.status = -1;
    }
}
