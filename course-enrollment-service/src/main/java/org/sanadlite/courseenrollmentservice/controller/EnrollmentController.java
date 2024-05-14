package org.sanadlite.courseenrollmentservice.controller;

import lombok.AllArgsConstructor;
import lombok.extern.java.Log;
import org.sanadlite.courseenrollmentservice.model.Enrollment;
import org.sanadlite.courseenrollmentservice.service.EnrollmentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/enrollments")
@Log
public class EnrollmentController {
    private EnrollmentService enrollmentService;
    @GetMapping
    public ResponseEntity<Page<Enrollment>> getStudentEnrollments(String studentUUID, Pageable pageable){
        return ResponseEntity.ok(enrollmentService.getByStudentId(studentUUID, pageable));
    }

    @PostMapping
    public

}
