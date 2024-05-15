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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/enrollments")
@Log
public class EnrollmentController {
    private EnrollmentService enrollmentService;

    @GetMapping()
    public ResponseEntity<Page<Enrollment>> getEnrollments(@RequestParam(required = false) Long courseId,
                                                           @RequestParam(required = false) String studentUUID,
                                                           @RequestParam(required = false) Boolean status,
                                                           Pageable pageable){
        return ResponseEntity.ok(enrollmentService.enrollmentSearch(courseId, studentUUID, status, pageable));

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

    //TODO: test
    @PatchMapping("{enrollmentId}")
    public ResponseEntity<Enrollment> updateEnrollment(@PathVariable("enrollmentId") Long enrollmentId){
        Enrollment enrollment = enrollmentService.switchEnrollmentStatus(enrollmentId);
        if (enrollment == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(enrollment);
    }

    /**
     *
     * @param enrollmentRequestDto enrollment request
     * @return no content if enrollment deleted, not found if enrollment not found, forbidden if enrollment already accepted
     */
    @DeleteMapping
    public ResponseEntity<Object> deleteEnrollment(@RequestBody EnrollmentRequestDto enrollmentRequestDto){
        if(enrollmentService.cancelEnrollment(enrollmentRequestDto) == -1)
            return ResponseEntity.notFound().build();
        if(enrollmentService.cancelEnrollment(enrollmentRequestDto) == 0)
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Cannot delete already enrolled in course");
        return ResponseEntity.noContent().build();
    }
}
