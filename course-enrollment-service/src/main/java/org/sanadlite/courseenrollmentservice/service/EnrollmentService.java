package org.sanadlite.courseenrollmentservice.service;

import org.sanadlite.courseenrollmentservice.model.Enrollment;
import org.sanadlite.courseenrollmentservice.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepository enrollmentRequestRepository;
    public Page<Enrollment> getByStudentId(String studentUUID, Pageable pageable) {
        return enrollmentRequestRepository.findByStudentUUID(studentUUID, pageable);
    }
}
