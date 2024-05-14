package org.sanadlite.courseenrollmentservice.controller;

import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.sanadlite.courseenrollmentservice.dto.EnrollmentRequestDto;
import org.sanadlite.courseenrollmentservice.feign.courseservice.CourseInterface;
import org.sanadlite.courseenrollmentservice.feign.courseservice.CourseResponseDto;
import org.sanadlite.courseenrollmentservice.model.Enrollment;
import org.sanadlite.courseenrollmentservice.service.EnrollmentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/enrollments")
@Log
public class EnrollmentController {
    private EnrollmentService enrollmentService;

    /**
     *
     * @param studentUUID student id
     * @param pageable page number and size
     * @return list of enrollments
     */
    @GetMapping
    public ResponseEntity<Page<Enrollment>> getStudentEnrollments(String studentUUID, Pageable pageable){
        return ResponseEntity.ok(enrollmentService.getByStudentId(studentUUID, pageable));
    }

    /**
     *
     * @param enrollmentRequestDto enrollment request
     * @return enrollment, bad request if course not found or capacity exceeded or enrollment already exists
     */
    @PostMapping
    public ResponseEntity<Enrollment> createEnrollment(@RequestBody EnrollmentRequestDto enrollmentRequestDto){
        Enrollment enrollment = enrollmentService.addEnrollment(enrollmentRequestDto);
        if (enrollment == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(enrollment);
    }
}
